import { Logx } from '@tarox/helper-node'

export default (ctx, options) => {
	const {
		libName
	} = options

  ctx.onBuildStart(() => {
		Logx.start('载入插件 plugin-package-link')
  });

	ctx.modifyBuildTempFileContent(({tempFiles}) => {
		Logx.start('修改通过 link 方式引入的组件引用路径')
		for (const key in tempFiles) {
			const usingComponents = tempFiles[key].config
			if (usingComponents) {
				for (const componentName in usingComponents) {
					let componentPath = usingComponents[componentName];
					const identiIndex = componentPath.indexOf(libName)
					if (identiIndex > -1) {
						Logx.read(`'发现 link 组件路径' ${componentPath}`)
						usingComponents[componentName] = `${componentPath.slice(0, identiIndex)}/npm/${libName}/${componentPath.slice(identiIndex + libName.length)}`
					}
				}
			}
		}
	})

	ctx.modifyBuildAssets(({assets}) => {
		Logx.start('修改通过 link 方式引入的组件输出路径')
		Object.keys(assets).forEach((srcKey) => {
			const identifierIndex = srcKey.indexOf(libName)
			if (identifierIndex === -1) {
				return
			}
			Logx.modify(`link 组件输出路径为 npm/${libName}/${srcKey.slice(identifierIndex + libName.length)}`)
			assets[`npm/${libName}/${srcKey.slice(identifierIndex + libName.length)}`] = assets[srcKey]
			Reflect.deleteProperty(assets, srcKey)
		})
	})
}
