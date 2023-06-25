/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-16.
 */

import { translate } from '@src/i18n'
import {
  ApiServerInfo,
  Callbacks,
  ChatConversation,
  ChatMessage,
  ICloudChatMate,
  ICloudChatMateData,
  IState
} from '@src/types'
import { getTimestampSecond } from '@src/utils/utils'
import { uuidv4 } from '@src/utils/uuid'
import {
  OpenAIAPITokenCost,
  OpenAIConst,
  calcOpenAIApiTokenCost
} from './openai'
import {
  ResourcePromptInfo,
  ResourcePromptLanguage,
  ResourcePromptTag,
  ResourcePromptTagColors,
  ResourcePromptTagTypes
} from './resourcePrompts'
import { iCloudHelperAPI } from './icloudHelper'
import { ICLOUD_CHAT_DATA_PATH } from '@src/config'
import { logInfo } from './logger'
import {
  mergeConversationMaps,
  removeConversationFromMap
} from './conversation'

export type CHAT_ACTION_MENU_TYPE =
  | 'rename'
  | 'model'
  | 'temperature'
  | 'prompt'
  | 'messages'
  | 'copy'
  | 'share'
  | 'delete'
  | 'new'
  | 'stat'
  | 'shortcut'
export type CHAT_MESSAGE_ACTION_MENU_TYPE =
  | 'copy'
  | 'share'
  | 'none'
  | 'speech'

export const CHAT_ACTION_MENU_TYPE_LIST: Array<CHAT_MESSAGE_ACTION_MENU_TYPE> =
  ['none', 'copy', 'share', 'speech']

export const syncICloudChatMate = async (
  cache: IState.CacheState
) => {
  return iCloudHelperAPI.syncICloudData<ICloudChatMate>(
    ICLOUD_CHAT_DATA_PATH,
    async (cloud_data?: ICloudChatMate) => {
      if (
        !cloud_data ||
        !cloud_data.data ||
        !cloud_data.data.conversations
      ) {
        logInfo('Cloud data is empty, use local data')
        return {
          data: {
            conversations: cache?.conversations
          },
          extra: {
            recentRemovedChatIds: cache?.recentRemovedChatIds
          }
        }
      }

      const local_chats = removeConversationFromMap(
        cache?.conversations,
        cloud_data.extra?.recentRemovedChatIds
      )
      const data_chats = removeConversationFromMap(
        cloud_data.data.conversations,
        cache?.recentRemovedChatIds
      )

      const new_conversations = mergeConversationMaps(
        local_chats,
        data_chats
      )

      const new_recentRemovedChatIds = [
        ...(cache?.recentRemovedChatIds || []),
        ...(cloud_data.extra?.recentRemovedChatIds || [])
      ]

      let new_icloud_data: ICloudChatMate = {
        data: {
          conversations: new_conversations
        },
        extra: {
          recentRemovedChatIds: new_recentRemovedChatIds
        }
      }

      logInfo('sync new_icloud_data', new_icloud_data)

      return new_icloud_data
    }
  )
}

/**
 * 聊天会话统计
 * @param conversation
 * @returns
 */
export const chatStat = (conversation: ChatConversation) => {
  const gptMessages =
    conversation &&
    conversation.messages &&
    conversation.messages.length > 0
      ? conversation.messages.filter(
          (message: ChatMessage) =>
            message.message.role === 'assistant'
        )
      : []

  if (gptMessages.length === 0) return undefined

  let cost =
    gptMessages
      .filter((message: ChatMessage) => message.usage)
      .map((message: ChatMessage) =>
        calcOpenAIApiTokenCost(message.usage, message.model!)
      )
      .filter((_cost?: OpenAIAPITokenCost) => _cost !== undefined)
      .map((_v) => _v?.total)
      .reduce((_a, _b) => _a! + _b!) || 0
  cost = Math.round(cost * 100000) / 100000

  return {
    tokens: gptMessages
      .filter((message: ChatMessage) => message.usage)
      .map((message: ChatMessage) => message.usage?.total_tokens)
      .reduce((_a, _b) => _a! + _b!),
    cost,
    gptMessages: gptMessages.length
  }
}

/**
 * 新建聊天会话
 * @param props
 * @returns
 */
export const newChatConversation = (props?: {
  id?: string
  title?: string
  prompt?: string
  createAt?: number
}): ChatConversation => {
  return {
    id: 'cm-' + (props?.id ? props?.id : (uuidv4() as string)),
    title: props?.title ?? translate('chat.newChat'),
    prompt: props?.prompt ?? translate('chat.prompt.default'),
    createAt: props?.createAt ?? getTimestampSecond()
  }
}

export enum ChatFontSizeRatio {
  normal = 1,
  large = 1.15,
  larger = 1.3
}

export const parseResourcePrompts = (
  shortcuts?: Array<ResourcePromptInfo>,
  language: 'cn' | 'en' | 'zh' | 'ja' | 'ko' = 'en'
): Array<PromptShortcutInfo> | undefined => {
  if (!shortcuts) return []

  const _language = language === 'cn' ? 'zh' : language

  return shortcuts
    .filter((shortcut) => shortcut[_language])
    .map((shortcut: ResourcePromptInfo, index) => {
      return {
        id: index,
        weight: shortcut.weight || 30,
        website:
          !shortcut.website ||
          shortcut.website === null ||
          shortcut.website.length === 0
            ? undefined
            : shortcut.website,
        tags: shortcut.tags.map((_tag) => ({
          name: _tag,
          label: ResourcePromptTagTypes.includes(_tag)
            ? translate('tags.' + _tag)
            : _tag,
          color: ResourcePromptTagColors[_tag] || '#999'
        })),
        title: shortcut[_language].title,
        prompt: shortcut[_language].prompt,
        description: shortcut[_language].description
      }
    })
    .sort((a, b) => b.weight - a.weight)
}

export interface PromptShortcutInfo {
  id: number
  title: string
  prompt: string
  tags: ResourcePromptTag[]
  description?: string
  website?: string
  weight: number
}

export const getSettingApiServer = (servers?: ApiServerInfo[]) => {
  if (!servers || !servers.length) return OpenAIConst.API_SERVERS[0]
  const matchs = servers.find((server) => server.use)
  return matchs ? matchs.serverHost : servers[0].serverHost
}
