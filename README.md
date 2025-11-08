# ChatMate-GPT

[![Build Status][build-status-image]][build-status]
[![license][license-image]][repository-url]
[![GitHub repo size][repo-size-image]][repository-url]
[![Release Date][rle-image]][rle-url]
[![GitHub last commit][last-commit-image]][repository-url]
[![tag][tag-image]][rle-url]

ChatMate 是一个基于 Open AI GPT-3 的聊天应用。使用 React Native 开发，支持 Android 和 iOS。

[![Download on the App Store](https://raw.githubusercontent.com/funnyzak/ChatMate-GPT/main/.github/assets/icons/appstorebadge.svg)](https://apps.apple.com/cn/app/%E8%81%8A%E5%A4%A9%E4%BC%99%E4%BC%B4/id6446275365)

[Download on the testflight](https://testflight.apple.com/join/qcHvaScN)

[Download Android](https://github.com/funnyzak/ChatMate-GPT/releases/latest)

## TODO

- [x] Android 适配优化
- [ ] 新版本提示
- [ ] 置顶会话

## Features

- 以对话的形式跟 GPT 聊天
- 支持多种语言设置
- 支持多种界面主题设置
- 内置 [ChatGPT-Shortcut](https://github.com/rockbenben/ChatGPT-Shortcut) 提示词库
- 支持聊天会话自定义设置
- 高度自定义的 API 设置
- 支持流式消息回复
- 支持对回复消息 MarkDown 渲染
- 支持对消息内容进行内容朗读
- 支持对消息内容进行导出 CSV
- 支持对聊天会话进行 iCloud 同步
- 支持设置多 API Server 设置
- 支持查询 API 花费
- 支持 URL Scheme
- 支持消息会话列表排序
- 支持聊天字体大小设置
- 支持实时消息会话 Token、Cost 显示
- 聊天提示词支持多个关键词设置
- 支持回复消息代码块渲染、复制
- ...

## Screenshots

![chatmate](https://raw.githubusercontent.com/funnyzak/ChatMate-GPT/main/.github/assets/screenshots/chatmate-gpt-ios.jpg)

## Development

```bash

# clone repos
$ git clone https://github.com/funnyzak/ChatMate-GPT.git && cd ChatMate-GPT

# deps install
$ yarn

# 依赖包额外补丁
yarn postinstall

# ios pod install
yarn pod

# start react-native-debugger（only mac）
yarn debug

# iOS simulator start
yarn ios

# Android simulator start
yarn android

# plop generate template
yarn p

# print rn info
npx react-native info

# upgrade rn version
npx react-native upgrade

# iOS debug info start
npx react-native run-ios --verbose

# iOS release build
npx react-native run-ios --configuration Release

# iOS debug use special device
react-native run-ios --simulator="iPhone 14 Pro"

# Android debug info start
npx react-native run-android --verbose

# Testing the release build
npx react-native run-android --variant=release

# build android release apk
cd android
# aab file
./gradlew bundleRelease
# apk file
./gradlew assembleRelease

npx react-native run-android --variant release

```

## Structure

```plain
├── src                      # 源码目录
│   ├── App.tsx              # app根组件
│   ├── actions              # actions
│   ├── assets               # 静态资源
│   ├── components           # 组件
│   ├── config               # 配置文件
│   ├── helper               # 应用服务类
│   ├── hooks                # 钩子
│   ├── i18n                 # 多语言支持
│   ├── navigation           # 路由导航
│   ├── reducers             # reducers
│   ├── store                # store
│   ├── theme                # 主题
│   ├── types                # 类型定义
│   ├── utils                # 工具类
│   └── api                  # API库
├── .editorconfig            # 编辑器配置
├── .eslintrc.js             # eslint的配置文件
├── .gitignore               # 配置git提交需要忽略的文件
├── .husky                   # git钩子配置
├── .prettierrc.js           # 代码格式化规则
├── .watchmanconfig          # Watchman的配置文件，用于监控bug文件和文件变化，并且可以出发指定的操作
├── __tests__                # 测试
├── android                  # Android文件所在目录，包含AndroidStudio项目环境文件；
├── app.json                 #
├── babel.config.js          # Babel的配置文件
├── global.d.ts              # ts全局声明文件
├── index.js                 # 程序入口文件
├── ios                      # iOS文件所在目录，包含XCode项目环境；
├── metro.config.js
├── package.json             # 项目基本信息（比如名称、版本、许可证等元数据）以及依赖信息（npm install安装的模块）等
├── tsconfig.json            # typescript编译配置文件
└── yarn.lock                # 依赖版本锁定文件
```

## Contribution

如果你有任何的想法或者意见，欢迎提 Issue 或者 PR。

<a href="https://github.com/funnyzak/ChatMate-GPT/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=funnyzak/ChatMate-GPT" />
</a>

### Reference

- [ChatGPT-Shortcut](https://github.com/rockbenben/ChatGPT-Shortcut) is a chatgpt prompt word library.
- [enviroment setup](https://reactnative.dev/docs/environment-setup) to setup react-native development environment.
- [running on device](https://reactnative.dev/docs/running-on-device) to run app on device.
- [debugging](https://twitter.com/i/spaces/1YqJDqDpqzAxV) to debug app.
- [react native typescript](https://reactnative.dev/docs/typescript) to use typescript in react-native.
- [react native cn](https://reactnative.cn/) to learn react-native.
- [react-devtools](https://www.npmjs.com/package/react-devtools) to debug react component.
- [fetch](https://reactnative.cn/docs/network) to use fetch in react-native.
- [lodash](https://github.com/lodash/lodash) is a modern JavaScript utility library delivering modularity, performance & extras.
- [redux](https://github.com/reduxjs/redux) is a predictable state container for JavaScript apps.
- [react-native-render-html](https://github.com/meliorence/react-native-render-html) is a performant, comprehensive, extensible HTML/JS renderer for React Native.
- [react-navigation](https://github.com/react-navigation/react-navigation) is an extensible yet easy-to-use navigation solution written in JavaScript.
- [react-native-webview](https://github.com/react-native-webview/react-native-webview) is a React Native wrapper for Apple's WKWebView or Google's Android WebView.
- [async-storage](https://github.com/react-native-async-storage/async-storage) is an asynchronous, persistent, key-value storage system for React Native.
- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) is a performant React Native image component.
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) is a React Native library providing fluid, gesture and performance native animations.
- [react-native-localize](https://github.com/zoontek/react-native-localize) is a module to handle i18n/localization of your React Native app.
- [react-native-device-info](https://github.com/react-native-device-info/react-native-device-info) is a device information for React Native iOS and Android.
- [react-native-skeleton-placeholder](https://github.com/chramos/react-native-skeleton-placeholder) is a simple yet fully customizable component made to achieve loading animation in a Skeleton-style.
- [react-native-actions-sheet](https://github.com/ammarahm-ed/react-native-actions-sheet) is a cross-platform React Native component that uses the native Apple and Android action sheet to create a universal actionsheet.
- [react-native-numeric-input](https://github.com/himelbrand/react-native-numeric-input) is a numeric input component for react-native.
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) is a React Native module supports using custom icon sets.
- [qs](https://github.com/ljharb/qs) is a querystring parser with nesting support.
- [react-native-switch](https://github.com/shahen94/react-native-switch) is a switch component for React Native.
- [react-native-haptic-feedback](https://github.com/mkuczera/react-native-haptic-feedback) is a React Native module for providing haptic feedback.
- [gpt3-tokenizer](https://github.com/botisan-ai/gpt3-tokenizer) is a tokenizer for OpenAI's GPT-3.
- [react-native-uuid](https://github.com/eugenehp/react-native-uuid) is a native UUID generator for React Native.
- [react-native-animatable](https://github.com/markdown-it/markdown-it) is a standard-compliant markdown parser.
- [react-native-clipboard](https://github.com/react-native-clipboard/clipboard) is a React Native Clipboard API for iOS and Android.
- [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) is a React Native module for providing chat UI.
- [react-native-restart](https://github.com/avishayil/react-native-restart) is a React Native module for restarting the app programmatically.
- [react-native-floating-label-input](https://github.com/Cnilton/react-native-floating-label-input) is a React Native module for providing floating label input.
- [react-native-url-polyfill](https://www.npmjs.com/package/react-native-url-polyfill) is a React Native module for providing URL polyfill.
- [react-native-rate](https://www.npmjs.com/package/react-native-rate) is a React Native module for providing rate app.
- [text-encoding](https://github.com/inexorabletash/text-encoding) is a polyfill for the Encoding Living Standard's API.
- [react-native-document-picker](https://github.com/rnmods/react-native-document-picker) is a React Native module for providing document picker.
- [react-native-cloud-store](https://www.npmjs.com/package/react-native-cloud-store) is a React Native module for providing cloud store.
- [react-native-tts](https://www.npmjs.com/package/react-native-tts) is a React Native module for providing text to speech.
- [react-native-fs](https://www.npmjs.com/package/react-native-fs) is a React Native module for providing file system.
- [react-native-ios-context-menu](https://www.npmjs.com/package/react-native-ios-context-menu) is a React Native module for providing iOS context menu.

## License

MIT License © 2023 [funnyzak](https://github.com/funnyzak)

<!-- [![action][ci-image]][ci-url] -->
<!-- [![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard) -->
<!-- [![GitHub commit activity][commit-activity-image]][repository-url] -->
<!-- [![Sourcegraph][sg-image]][sg-url] -->

[repo-size-image]: https://img.shields.io/github/repo-size/funnyzak/ChatMate-GPT?style=flat-square&logo=github&logoColor=white&label=size
[down-latest-image]: https://img.shields.io/github/downloads/funnyzak/ChatMate-GPT/latest/total.svg
[down-total-image]: https://img.shields.io/github/downloads/funnyzak/ChatMate-GPT/total.svg
[commit-activity-image]: https://img.shields.io/github/commit-activity/m/funnyzak/ChatMate-GPT?style=flat-square
[last-commit-image]: https://img.shields.io/github/last-commit/funnyzak/ChatMate-GPT?style=flat-square
[license-image]: https://img.shields.io/github/license/funnyzak/ChatMate-GPT.svg?style=flat-square
[repository-url]: https://github.com/funnyzak/ChatMate-GPT
[rle-url]: https://github.com/funnyzak/ChatMate-GPT/releases/latest
[rle-all-url]: https://github.com/funnyzak/ChatMate-GPT/releases
[ci-image]: https://img.shields.io/github/workflow/status/funnyzak/ChatMate-GPT/react-native-android-build-apk
[ci-url]: https://github.com/funnyzak/ChatMate-GPT/actions
[rle-image]: https://img.shields.io/github/release-date/funnyzak/ChatMate-GPT.svg?style=flat-square&label=release
[sg-image]: https://img.shields.io/badge/view%20on-Sourcegraph-brightgreen.svg?style=flat-square
[sg-url]: https://sourcegraph.com/github.com/funnyzak/ChatMate-GPT
[build-status-image]: https://github.com/funnyzak/ChatMate-GPT/actions/workflows/release.yml/badge.svg
[build-status]: https://github.com/funnyzak/ChatMate-GPT/actions
[tag-image]: https://img.shields.io/github/tag/funnyzak/ChatMate-GPT.svg
