/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import { newChatConversation } from '@src/helper/chatHelper'
import {
  conversationMapToList,
  sortConversationMap,
  sortConversations
} from '@src/helper/conversation'
import { logInfo } from '@src/helper/logger'
import { RootState } from '@src/store'
import { Dispatch } from 'redux'
import {
  APP_CHAT_ERROR,
  APP_CHAT_MESSAGE_STREAMING,
  APP_CHAT_REQUESTING,
  APP_CHAT_STATUS,
  APP_CHAT_USER_MESSAGE,
  APP_SET_CURRENT_CONVERSATION,
  ChatConversation
} from '../types'
import { updateConversations } from './CacheActions'
export const setCurrentConversation =
  (conversation?: ChatConversation, updateCache: boolean = true) =>
  async (dispatch: Dispatch) => {
    // logInfo('update current conversation updateAt', conversation)
    if (
      conversation &&
      conversation.messages &&
      conversation.messages.length > 0
    ) {
      conversation.updateAt =
        conversation.messages[
          conversation.messages.length - 1
        ].createAt
    }
    // logInfo('setCurrentConversation', conversation)
    if (conversation && updateCache)
      dispatch(updateConversations([conversation]) as any)
    dispatch({
      type: APP_SET_CURRENT_CONVERSATION,
      payload: conversation
    })
  }

export const refreshCurrentConversion =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const _state = getState()

    if (
      !_state.cache.conversations ||
      Object.keys(_state.cache.conversations).length === 0
    )
      return

    if (
      !_state.chat.chat ||
      !(_state.cache.conversations || {})[_state.chat.chat.id]
    ) {
      dispatch(
        setCurrentConversation(
          sortConversations(
            conversationMapToList(_state.cache.conversations || {}),
            _state.chatSetting.conversationOrderBy
          )[0],
          false
        ) as any
      )
    } else {
      dispatch(
        setCurrentConversation(
          _state.cache.conversations[_state.chat.chat.id],
          false
        ) as any
      )
    }
  }

export const setChattUserMessage = (message?: string) => ({
  type: APP_CHAT_USER_MESSAGE,
  payload: message
})

export const initCurrentConversation =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const _state = getState()
    if (
      !_state.cache.conversations ||
      Object.keys(_state.cache.conversations).length === 0
    ) {
      dispatch(setCurrentConversation(newChatConversation()) as any)
      return
    }
    const conversations = conversationMapToList(
      sortConversationMap(_state.cache.conversations)
    )
    if (_state.chatSetting.alwaysNewChat) {
      dispatch(
        setCurrentConversation(
          conversations[0].messages
            ? newChatConversation()
            : conversations[0]
        ) as any
      )
    } else {
      if (!_state.chat.chat) {
        dispatch(setCurrentConversation(conversations[0]) as any)
      }
    }
  }
export const setChatError = (error?: Error) => ({
  type: APP_CHAT_ERROR,
  payload: error
})
export const setChatRequesting = (requesting: boolean) => ({
  type: APP_CHAT_REQUESTING,
  payload: requesting
})
export const setChatMessageStreaming = (streaming: boolean) => ({
  type: APP_CHAT_MESSAGE_STREAMING,
  payload: streaming
})
export const setChatStatus = (
  requesting: boolean,
  messageStreaming: boolean
) => ({
  type: APP_CHAT_STATUS,
  payload: { requesting, messageStreaming }
})
