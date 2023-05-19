import { MessageBubble } from './../screens/components/chat/Bubble'
/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import {
  CHAT_MESSAGE_ACTION_MENU_TYPE,
  OpenAICompletionModelType
} from '@src/helper'
import { ConversationOrderByType } from '@src/helper/conversation'
import { ICloudData } from '@src/hooks'
import { LanguageTagType } from '@src/i18n'
import { ThemeType } from '@src/theme'
import { ChatConversation } from '@src/types'
export namespace IState {
  export interface State {
    app: AppState
    setting: SettingState
    chatSetting: ChatSettingState
    openAISetting: OpenAISettingState
    chat: ChatState
    cache: CacheState
  }
  export interface AppState {
    name?: string
    deviceInfo?: {
      brand: string
      bundleId: string
      deviceName: string
      model: string
      phoneNum: string
      systemName: string
      uniqueId: string
      userAgent: string
      systemVersion: string
    }
    version: {
      version: string
      buildId?: string
      buildNumber?: string
    }
    latestVersion?: {
      version: string
      buildId: string
      features: string
    }
    aboutUs: {
      author: string
      email: string
      site: string
      github: string
      wechat: string
      twitter: string
      discord: string
      copyright: string
    }
    errorMessage?: Error[]
  }
  export interface SettingState {
    hapticFeedback: boolean
    languageTag: LanguageTagType
    theme: ThemeType
    themeNightMode: ThemeType
    themeLightMode: ThemeType

    pasteFromClipboard: boolean

    icloudSync: boolean
    lastSyncTime?: number

    openLinkInApp: boolean
  }
  export interface ChatSettingState {
    avatarImgUrl?: string
    showUserAvatar: boolean
    showUserName: boolean
    userName?: string
    loadEarlier: boolean
    alwaysNewChat: boolean
    alwaysShowSend: boolean
    alwaysShowPrompt: boolean
    conversationOrderBy: ConversationOrderByType
    streamMessage: boolean
    fontSizeRatio: number
    messageBubbleBehavior: CHAT_MESSAGE_ACTION_MENU_TYPE
  }
  export interface OpenAISettingState {
    apiKey: string
    apiServer: string
    apiServers: Array<ApiServerInfo>
    model: OpenAICompletionModelType
    temperature: number
    top_p?: number
    n: number
    stop?: Array<string>
    maxMessagesInContext: number
    maxTokensInContext: number
    maxTokensPerReply: number
    showModelName: boolean
    showWordCount: boolean
    showEstimatedTokenCount: boolean
    renderMd: boolean
    /**
     * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more.
     */
    apiIdentifier?: string
    networkTimeout: number
  }
  export interface ChatState {
    requesting: boolean
    messageStreaming: boolean
    messageError?: Error

    /**
     * Send a message to the current session globally
     */
    userMessage?: string
    /**
     * Current conversation
     */
    chat?: ChatConversation
  }

  export interface CacheState {
    /**
     * 所有会话缓存
     */
    conversations?: {
      [chatid: string]: ChatConversation
    }

    /**
     * 最近删除的会话
     */
    recentRemovedChatIds?: Array<string>
    /**
     * 提示词缓存
     */
    promptShortcuts?: {
      lastUpdate: number
      shortcuts: Array<Record<string, any>>
    }
    /**
     * 功能使用提醒缓存
     */
    featureTipsHistory?: {
      [featureKey in FeatureTipType]?: number
    }
    /**
     * 会话过滤标签（临时）
     */
    shortcutFilterSetting?: {
      tags?: Array<string>
      search?: string
    }
  }
}

/**
 * Api server info
 */
export interface ApiServerInfo {
  id: string
  isSystem: boolean
  use: boolean
  name?: string
  description?: string
  serverHost: string
}

/**
 * 功能特征类型
 */
export type FeatureTipType =
  | 'fetchShortcuts'
  | 'messageBubble'
  | 'apiServerLongPress'
  | 'apiKeyTableRowLongPress'
  | 'rowClickShowDetail'
  | 'chatBubblePress'

/**
 * ICloud container setting
 */
export interface ICloudContainerSetting {
  name: string
}

/**
 * ICloud chat data type
 */
export interface ICloudChatMate
  extends ICloudData<ICloudChatMateData> {
  extra?: {
    recentRemovedChatIds?: string[]
  }
}

/**
 * ICloud chat data
 */
export interface ICloudChatMateData {
  conversations: IState.CacheState['conversations']
}

export interface Callbacks {
  finallyCallback?: () => void
  failCallback?: (error?: any) => void
  successCallback?: (result?: any) => void
}
