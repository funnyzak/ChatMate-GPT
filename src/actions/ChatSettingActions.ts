/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-08.
 */

import { CHAT_MESSAGE_ACTION_MENU_TYPE } from '@src/helper'
import {
  APP_CHAT_SETTING_AVATAR_LINK,
  APP_CHAT_SETTING_SHOW_USER_AVATAR,
  APP_CHAT_SETTING_SHOW_USER_NAME,
  APP_CHAT_SETTING_ALWAYS_SHOW_SEND_BUTTON,
  APP_CHAT_SETTING_ALWAYS_SHOW_PROMPT,
  APP_CHAT_SETTING_FONT_SIZE_RATIO,
  APP_CHAT_SETTING_CONVERSATIONS_ORDER_BY,
  APP_CHAT_SETTING_IS_LOADING_EARLIER,
  APP_CHAT_ALWAYS_NEW_CHAT,
  APP_CHAT_SETTING_MESSAGE_BUBBLE_BEHAVIOR,
  APP_CHAT_SETTING_STREAM_MESSAGE,
  APP_CHAT_SETTING_USER_NAME
} from '../types'
export const setChatSettingAvatarLink = (avatarLink: string) => ({
  type: APP_CHAT_SETTING_AVATAR_LINK,
  payload: avatarLink
})
export const setChatSettingMessageBubbleBehavior = (
  behavior: CHAT_MESSAGE_ACTION_MENU_TYPE
) => ({
  type: APP_CHAT_SETTING_MESSAGE_BUBBLE_BEHAVIOR,
  payload: behavior
})
export const setChatSettingFontSizeRatio = (
  fontSizeRatio: number
) => ({
  type: APP_CHAT_SETTING_FONT_SIZE_RATIO,
  payload: fontSizeRatio
})

export const setChatSettingSteamMessage = (
  streamMessage: boolean
) => ({
  type: APP_CHAT_SETTING_STREAM_MESSAGE,
  payload: streamMessage
})
export const setChatSettingShowUserAvatar = (
  showUserAvatar: boolean
) => ({
  type: APP_CHAT_SETTING_SHOW_USER_AVATAR,
  payload: showUserAvatar
})
export const setChatSettingShowUserName = (
  showUserName: boolean
) => ({
  type: APP_CHAT_SETTING_SHOW_USER_NAME,
  payload: showUserName
})
export const setChatSettingIsLoadingEarlier = (
  isLoadingEarlier: boolean
) => ({
  type: APP_CHAT_SETTING_IS_LOADING_EARLIER,
  payload: isLoadingEarlier
})
export const setChatSettingUserName = (userName: string) => ({
  type: APP_CHAT_SETTING_USER_NAME,
  payload: userName
})
export const setChatSettingAlwaysNewChat = (
  alwaysNewChat: boolean
) => ({
  type: APP_CHAT_ALWAYS_NEW_CHAT,
  payload: alwaysNewChat
})
export const setChatSettingAlwaysShowSendButton = (
  alwaysShowSend: boolean
) => ({
  type: APP_CHAT_SETTING_ALWAYS_SHOW_SEND_BUTTON,
  payload: alwaysShowSend
})
export const setChatSettingAlwaysShowPrompt = (
  alwaysShowPrompt: boolean
) => ({
  type: APP_CHAT_SETTING_ALWAYS_SHOW_PROMPT,
  payload: alwaysShowPrompt
})
export const setChatSettingConversationsOrderBy = (
  conversationOrderBy: 'CreateTime' | 'UpdateTime'
) => ({
  type: APP_CHAT_SETTING_CONVERSATIONS_ORDER_BY,
  payload: conversationOrderBy
})
