/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

export const BRAND_NAME = 'ChatMate'
export const ABOUT_US = {
  author: 'leon',
  email: 'leo@yycc.dev',
  site: 'https://chat-mate.app/',
  github: 'funnyzak',
  wechat: 'funnyzak',
  twitter: 'funnyzak',
  discord: 'https://discord.gg/FJApANBQPj',
  copyright: '© 2023 funnyzak'
}
export const AppleStore_ID = '6446275365'
/**
 * 缓存时间
 */
export const CACHE_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7 // 7 days
/**
 * 项目官网
 */
export const OFFICIAL_SITE = 'https://chat-mate.app'

/**
 * 日期格式化规则
 */
export const DATE_FORMAT = 'DD/MM/YYYY'
/**
 * OpenAI AppKey
 */
export const OPEN_AI_APPKEY = 'OPEN_AI_APPKEY'
export const REPO_NAME = 'funnyzak/ChatMate-GPT'
/**
 * 项目地址
 */
export const REPO_GITHUB_URL = `https://github.com/${REPO_NAME}`
/**
 * 隐私政策
 */
export const PRIVACY_POLICY_LINK = `http://chat-mate.app/link/app/privacypolicy/`
/**
 * 更新日志
 */
export const CHANGELOG_LINK = `http://chat-mate.app/link/app/changelog/`
/**
 * FAQ
 */
export const FAQ_LINK = `http://chat-mate.app/link/app/faq/`

/**
 * 最新发布
 */
export const RELEASE_NOTES_LINK = `${REPO_GITHUB_URL}/releases`
/**
 * API JSON
 */
export const RELEASE_API = `https://api.github.com/repos/${REPO_NAME}/releases/latest`
declare type openSourceInfoType = {
  name: string
  repoUrl: string
}
/**
 * URLSchemes
 */
export const URLSchemeList = {
  OpenApp: 'chatmate://run'
}

/**
 * Reources
 */
/**
 * App Store 地址
 */
export const APP_STORE_URL =
  'https://chat-mate.app/link/chat-mate-app-store'
/**
 * Google Play 地址
 */
export const GOOGLE_PLAY_URL =
  'https://chat-mate.app/link/chat-mate-google-play'

export const HELP_GET_API_KEY_LINK =
  'https://chat-mate.app/link/help/get-api-key'
export const HELP_CUSTOM_API_SERVER_LINK =
  'https://chat-mate.app/link/help/custom-api-server'
export const PROMPT_SHORTCUTS_JSON_REMOTE = `https://chat-mate.app/resources/rockbenben/prompt-json`

export const PROMPT_SHORTCUTS_JSON_RESOURCE_OFFICAL = `https://chat-mate.app/resources/prompt-json`

export const PROMPT_SOURCE_FROM_REPOSITORY =
  'https://github.com/rockbenben/ChatGPT-Shortcut'

/**
 * 使用开源列表
 */
export const OPENSOURCE_LIST: Array<openSourceInfoType> = [
  {
    name: 'lodash',
    repoUrl: 'https://github.com/lodash/lodash'
  },
  {
    name: 'redux',
    repoUrl: 'https://github.com/reduxjs/redux'
  },
  {
    name: 'react-native-render-html',
    repoUrl: 'https://github.com/meliorence/react-native-render-html'
  },
  {
    name: 'react-navigation',
    repoUrl: 'https://github.com/react-navigation/react-navigation'
  },
  {
    name: 'react-native-webview',
    repoUrl:
      'https://github.com/react-native-webview/react-native-webview'
  },
  {
    name: 'async-storage',
    repoUrl:
      'https://github.com/react-native-async-storage/async-storage'
  },
  {
    name: 'react-native-fast-image',
    repoUrl: 'https://github.com/DylanVann/react-native-fast-image'
  },
  {
    name: 'react-native-reanimated',
    repoUrl:
      'https://github.com/software-mansion/react-native-reanimated'
  },
  {
    name: 'react-native-localize',
    repoUrl: 'https://github.com/zoontek/react-native-localize'
  },
  {
    name: 'react-native-device-info',
    repoUrl:
      'https://github.com/react-native-device-info/react-native-device-info'
  },
  {
    name: 'react-native-skeleton-placeholder',
    repoUrl:
      'https://github.com/chramos/react-native-skeleton-placeholder'
  },
  {
    name: 'react-native-actions-sheet',
    repoUrl:
      'https://github.com/ammarahm-ed/react-native-actions-sheet'
  },
  {
    name: 'react-native-numeric-input',
    repoUrl:
      'https://github.com/himelbrand/react-native-numeric-input'
  },
  {
    name: 'react-native-vector-icons',
    repoUrl: 'https://github.com/oblador/react-native-vector-icons'
  },
  {
    name: 'qs',
    repoUrl: 'https://github.com/ljharb/qs'
  },
  {
    name: 'react-native-switch',
    repoUrl: 'https://github.com/shahen94/react-native-switch'
  },
  {
    name: 'react-native-haptic-feedback',
    repoUrl:
      'https://github.com/mkuczera/react-native-haptic-feedback'
  },
  {
    name: 'gpt3-tokenizer',
    repoUrl: 'https://github.com/botisan-ai/gpt3-tokenizer'
  },
  {
    name: 'react-native-uuid',
    repoUrl: 'https://github.com/eugenehp/react-native-uuid'
  },
  {
    name: 'react-native-animatable',
    repoUrl: 'https://github.com/markdown-it/markdown-it'
  },
  {
    name: 'react-native-clipboard',
    repoUrl: 'https://github.com/react-native-clipboard/clipboard'
  },
  {
    name: 'react-native-gifted-chat',
    repoUrl: 'https://github.com/FaridSafi/react-native-gifted-chat'
  },
  {
    name: 'react-native-restart',
    repoUrl: 'https://github.com/avishayil/react-native-restart'
  },
  {
    name: 'react-native-floating-label-input',
    repoUrl:
      'https://github.com/Cnilton/react-native-floating-label-input'
  },
  {
    name: 'react-native-url-polyfill',
    repoUrl: 'https://www.npmjs.com/package/react-native-url-polyfill'
  },
  {
    name: 'react-native-rate',
    repoUrl: 'https://www.npmjs.com/package/react-native-rate'
  },
  {
    name: 'text-encoding',
    repoUrl: 'https://github.com/inexorabletash/text-encoding'
  },
  {
    name: 'react-native-document-picker',
    repoUrl: 'https://github.com/rnmods/react-native-document-picker'
  },
  {
    name: 'react-native-cloud-store',
    repoUrl: 'https://www.npmjs.com/package/react-native-cloud-store'
  },
  {
    name: 'react-native-tts',
    repoUrl: 'https://www.npmjs.com/package/react-native-tts'
  },
  {
    name: 'react-native-fs',
    repoUrl: 'https://www.npmjs.com/package/react-native-fs'
  },
  {
    name: 'react-native-ios-context-menu',
    repoUrl:
      'https://www.npmjs.com/package/react-native-ios-context-menu'
  }
]

export const ApiServersInitData = [
  {
    id: '1',
    isSystem: true,
    name: 'OpenAI',
    use: true,
    description: 'OpenAI Offical API',
    serverHost: 'https://api.openai.com'
  }
]
