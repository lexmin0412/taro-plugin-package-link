import { Logx } from '@tarox/helper-node'

export default (ctx, options) => {

	let {
		libs,  // 数组形式
		libName // 字符串形式 单个库
	} = options

	// 统一转换成数组方便处理
	if ( libName ) {
		libs = [libName]
	}

  ctx.onBuildStart(() => {
		Logx.start('载入插件 plugin-package-link', options)
  });

	ctx.modifyBuildTempFileContent(({tempFiles}) => {
		console.log('');
		Logx.start('修改 link 组件引用路径')
		for (const key in tempFiles) {
			const { usingComponents } = tempFiles[key].config
			if (usingComponents && Object.keys(usingComponents).length > 0) {
				for (const componentName in usingComponents) {
					let componentPath = usingComponents[componentName];

					let existedLib = ''
					let libIndex = -1
					const isLibExisted = libs.some((lib) => {
						if (componentPath.indexOf(lib) > -1) {
							existedLib = lib
							libIndex = componentPath.indexOf(lib)
						}
						return componentPath.indexOf(lib) > -1
					})

					if (isLibExisted) {
						Logx.read(`link 组件资源 所属组件库: ${existedLib}, 原引入路径: ${componentPath}`)
						usingComponents[componentName] = `${componentPath.slice(0, libIndex - 4)}/npm/${existedLib}/${componentPath.slice(libIndex + existedLib.length + 1)}`
						Logx.modify(`link 组件资源引入路径为 ${usingComponents[componentName]}`)
					}
				}
			}
		}
		Logx.end('修改 link 组件引用路径')
		console.log('');
	})

	ctx.modifyBuildAssets(({assets}) => {
		Logx.start('修改 link 组件资源构建后的输出路径')
		Object.keys(assets).forEach((srcKey) => {

			let existedLib = ''
			let libIndex = -1
			const isLibExisted = libs.some((lib) => {
				if (srcKey.indexOf(lib) > -1) {
					existedLib = lib
					libIndex = srcKey.indexOf(lib)
				}
				return srcKey.indexOf(lib) > -1
			})

			if (!isLibExisted) {
				return
			}
			const newPath = `npm/${existedLib}/${srcKey.slice(libIndex + existedLib.length + 1)}`
			Logx.read(`link 组件资源 所属组件库: ${existedLib}, 原输出路径: ${srcKey}`)
			Logx.modify(`link 组件资源输出路径为 ${newPath}`)
			assets[newPath] = assets[srcKey]
			Reflect.deleteProperty(assets, srcKey)
		})
		Logx.end('修改 link 组件资源构建后的输出路径')
		console.log('');
	})
}
