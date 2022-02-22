"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ctx, options) => {
    const { helper: { chalk } } = ctx;
    const { libName } = options;
    ctx.onBuildStart(() => {
        console.log(chalk.yellow('插件 plugin-package-link'), '编译开始');
        console.log('options:', options);
    });
    ctx.modifyBuildTempFileContent(({ tempFiles }) => {
        console.log('修改link ui lib 引用路径');
        for (const key in tempFiles) {
            if (Object.hasOwnProperty.call(tempFiles, key)) {
                const usingComponents = tempFiles[key].config['usingComponents'];
                console.log('usingComponents', usingComponents);
                if (usingComponents) {
                    for (const componentName in usingComponents) {
                        if (Object.hasOwnProperty.call(usingComponents, componentName)) {
                            let componentPath = usingComponents[componentName];
                            console.log('componentPath', componentPath);
                            const identiIndex = componentPath.indexOf(libName);
                            if (identiIndex > -1) {
                                usingComponents[componentName] = `../../npm/${libName}/${componentPath.slice(identiIndex + libName.length)}`;
                            }
                        }
                    }
                }
            }
        }
    });
    ctx.modifyBuildAssets(({ assets }) => {
        console.log('修改link ui lib输出路径');
        Object.keys(assets).forEach((srcKey) => {
            const identifierIndex = srcKey.indexOf('taro-xui');
            if (identifierIndex === -1) {
                return;
            }
            assets[`npm/${libName}/${srcKey.slice(identifierIndex + libName.length)}`] = assets[srcKey];
            Reflect.deleteProperty(assets, srcKey);
        });
    });
    ctx.onBuildFinish(() => {
        console.log(chalk.blue('插件 '), '编译结束');
    });
};
//# sourceMappingURL=index.js.map