/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import {
  APP_SET_CURRENT_CONVERSATION,
  APP_CHAT_ERROR,
  APP_CHAT_REQUESTING,
  APP_CHAT_MESSAGE_STREAMING,
  APP_CHAT_USER_MESSAGE,
  APP_CHAT_STATUS,
  Action,
  IState
} from '../types'
const INITIAL_STATE: IState.ChatState = {
  requesting: false,
  messageStreaming: false
}
export default (
  state: IState.ChatState = INITIAL_STATE,
  action: Action
): IState.ChatState => {
  switch (action.type) {
    case APP_CHAT_USER_MESSAGE:
      return { ...state, userMessage: action.payload }
    case APP_SET_CURRENT_CONVERSATION:
      return { ...state, chat: action.payload }
    case APP_CHAT_STATUS:
      return { ...state, ...action.payload }
    case APP_CHAT_REQUESTING:
      return { ...state, requesting: action.payload }
    case APP_CHAT_ERROR:
      return { ...state, messageError: action.payload }
    case APP_CHAT_MESSAGE_STREAMING:
      return { ...state, messageStreaming: action.payload }
    default:
      return state
  }
}
