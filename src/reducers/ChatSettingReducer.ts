/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-08.
 */

import {
  APP_CHAT_SETTING_AVATAR_LINK,
  APP_CHAT_SETTING_SHOW_USER_AVATAR,
  APP_CHAT_SETTING_SHOW_USER_NAME,
  APP_CHAT_SETTING_IS_LOADING_EARLIER,
  APP_CHAT_ALWAYS_NEW_CHAT,
  APP_CHAT_SETTING_USER_NAME,
  APP_CHAT_SETTING_ALWAYS_SHOW_SEND_BUTTON,
  APP_CHAT_SETTING_MESSAGE_BUBBLE_BEHAVIOR,
  APP_CHAT_SETTING_ALWAYS_SHOW_PROMPT,
  APP_CHAT_SETTING_STREAM_MESSAGE,
  APP_CHAT_SETTING_FONT_SIZE_RATIO,
  APP_CHAT_SETTING_CONVERSATIONS_ORDER_BY,
  Action,
  IState
} from '../types'
const INITIAL_STATE: IState.ChatSettingState = {
  showUserAvatar: false,
  alwaysNewChat: false,
  showUserName: false,
  loadEarlier: true,
  alwaysShowSend: true,
  alwaysShowPrompt: true,
  streamMessage: true,
  conversationOrderBy: 'updateTime',
  messageBubbleBehavior: 'copy',
  fontSizeRatio: 1
}
export default (
  state: IState.ChatSettingState = INITIAL_STATE,
  action: Action
): IState.ChatSettingState => {
  switch (action.type) {
    case APP_CHAT_SETTING_MESSAGE_BUBBLE_BEHAVIOR:
      return {
        ...state,
        messageBubbleBehavior: action.payload
      }
    case APP_CHAT_SETTING_FONT_SIZE_RATIO:
      return {
        ...state,
        fontSizeRatio: action.payload
      }
    case APP_CHAT_SETTING_SHOW_USER_AVATAR:
      return {
        ...state,
        showUserAvatar: action.payload
      }
    case APP_CHAT_SETTING_ALWAYS_SHOW_SEND_BUTTON:
      return {
        ...state,
        alwaysShowSend: action.payload
      }
    case APP_CHAT_SETTING_STREAM_MESSAGE:
      return {
        ...state,
        streamMessage: action.payload
      }
    case APP_CHAT_SETTING_ALWAYS_SHOW_PROMPT:
      return {
        ...state,
        alwaysShowPrompt: action.payload
      }
    case APP_CHAT_SETTING_CONVERSATIONS_ORDER_BY:
      return {
        ...state,
        conversationOrderBy: action.payload
      }
    case APP_CHAT_SETTING_SHOW_USER_NAME:
      return {
        ...state,
        showUserName: action.payload
      }
    case APP_CHAT_SETTING_IS_LOADING_EARLIER:
      return {
        ...state,
        loadEarlier: action.payload
      }
    case APP_CHAT_SETTING_AVATAR_LINK:
      return {
        ...state,
        avatarImgUrl: action.payload
      }
    case APP_CHAT_ALWAYS_NEW_CHAT:
      return {
        ...state,
        alwaysNewChat: action.payload
      }
    case APP_CHAT_SETTING_USER_NAME:
      return {
        ...state,
        userName: action.payload
      }
    default:
      return state
  }
}
