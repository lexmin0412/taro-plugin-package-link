# taro-plugin-package-link

通过 modifyBuildTempFileContent / modifyBuildAssets 修改构建产物，解决使用 npm/yarn/pnpm link 之后导致构建后的组件引入/输出路径错误的问题。

## Installation

```
yarn add taro-plugin-package-link -D
```

## Usage

在 config/index.js 中添加插件配置：

```js
module.exports = {
	plugins: [
		"taro-plugin-package-link", {
			libName: 'taro-xui',   // 这里的 taro-xui 就是通过 link 方式引入的ui库所在的 **本地文件夹** 名称
		}
	]
}
```

或传入数组：

```js
module.exports = {
	plugins: [
		"taro-plugin-package-link", {
			libs: ['taro-xui']
		}
	]
}
```
