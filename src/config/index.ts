/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-10.
 */

export * from './constants'
export * from './prompt'
import { ICloudContainerSetting } from '@src/types'
import LocalPromptShortcuts from './prompt/prompts.json'
import { Platform } from 'react-native'
import RNFS from 'react-native-fs'

export const config = {
  // 引导词更新频率（秒）
  promptUpdateInterval: 60 * 60 * 24,
  LocalPromptShortcuts
}

export type URLSchemeType = 'newchat' | 'openchat'

export const URLSchemeName = 'chatmate'

export interface OpenChatSchemeParams {
  id: string
  say?: string
}

export interface NewChatSchemeParams {
  title: string
  prompt?: string
}

export const URLSchemeConfig = {
  newchat: {
    startPrefix: `${URLSchemeName}://newchat`,
    demoParams: {
      title: 'hi',
      prompt: 'prompt'
    }
  },
  openchat: {
    startPrefix: `${URLSchemeName}://openchat`,
    demoParams: {
      id: '123',
      say: 'hello'
    }
  }
}

export const ICloudConfig: {
  containers: ICloudContainerSetting[]
} = {
  containers: [
    {
      name: 'iCloud.yycc.chatmate'
    }
  ]
}

/**
 * iCloud chat data path
 */
export const ICLOUD_CHAT_DATA_PATH =
  Platform.OS === 'ios'
    ? `/Library/Preferences/sync.lock`
    : `${RNFS.ExternalDirectoryPath}/sync.lock`
