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

## ChangeLog

[更新日志](https://github.com/lexmin0412/taro-plugin-package-link/blob/main/CHANGELOG.md)
