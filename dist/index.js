"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_node_1 = require("@tarox/helper-node");
exports.default = (ctx, options) => {
    const { libName } = options;
    ctx.onBuildStart(() => {
        helper_node_1.Logx.start('插件 plugin-package-link');
    });
    ctx.modifyBuildTempFileContent(({ tempFiles }) => {
        helper_node_1.Logx.start('修改通过 link 方式引入的组件引用路径');
        for (const key in tempFiles) {
            const usingComponents = tempFiles[key].config;
            if (usingComponents) {
                for (const componentName in usingComponents) {
                    let componentPath = usingComponents[componentName];
                    const identiIndex = componentPath.indexOf(libName);
                    if (identiIndex > -1) {
                        helper_node_1.Logx.read(`'发现 link 组件路径' ${componentPath}`);
                        usingComponents[componentName] = `${componentPath.slice(0, identiIndex)}/npm/${libName}/${componentPath.slice(identiIndex + libName.length)}`;
                    }
                }
            }
        }
    });
    ctx.modifyBuildAssets(({ assets }) => {
        helper_node_1.Logx.start('修改通过 link 方式引入的组件输出路径');
        Object.keys(assets).forEach((srcKey) => {
            const identifierIndex = srcKey.indexOf(libName);
            if (identifierIndex === -1) {
                return;
            }
            helper_node_1.Logx.modify(`link 组件输出路径为 npm/${libName}/${srcKey.slice(identifierIndex + libName.length)}`);
            assets[`npm/${libName}/${srcKey.slice(identifierIndex + libName.length)}`] = assets[srcKey];
            Reflect.deleteProperty(assets, srcKey);
        });
    });
};
//# sourceMappingURL=index.js.map