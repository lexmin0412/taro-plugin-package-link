# taro-plugin-package-link

link适配。

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
