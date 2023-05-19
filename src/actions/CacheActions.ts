/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import { PromptInfo, config, getPrompts } from '@src/config'
import {
  ResourcePromptInfo,
  fetchResourcePromptShortcuts,
  logInfo
} from '@src/helper'
import {
  newChatConversation,
  syncICloudChatMate
} from '@src/helper/chatHelper'
import { conversationListToMap } from '@src/helper/conversation'
import { getLocale, translate } from '@src/i18n'
import { RootState } from '@src/store'
import { getTimestampSecond } from '@src/utils/utils'
import { uuidv4 } from '@src/utils/uuid'
import { Dispatch } from 'redux'
import {
  APP_CACHE_CLEAR_CONVERSATIONS,
  APP_CACHE_FEATURE_TIP_HISTORY,
  APP_CACHE_REMOVE_CONVERSATIONS,
  APP_CACHE_SHORTCUTS,
  APP_CACHE_RECENT_REMOVED_CHAT_IDS,
  APP_CACHE_UPDATE_CONVERSATIONS,
  APP_SHORTCUT_FILTER_SETTING,
  ChatConversation,
  FeatureTipType,
  LanguageTagType,
  IState,
  Callbacks
} from '../types'
import {
  refreshCurrentConversion,
  setCurrentConversation
} from './ChatActions'
import { setICloudSyncTime } from '.'

export const setShortcuts = (
  shortcuts: Array<Record<string, any>>
) => ({
  type: APP_CACHE_SHORTCUTS,
  payload: {
    shortcuts,
    lastUpdate: getTimestampSecond()
  }
})

export const setShortcutFilterSetting = (setting: {
  tags?: Array<string>
  search?: string
}) => ({
  type: APP_SHORTCUT_FILTER_SETTING,
  payload: setting
})

export const fetchShortcuts =
  (params?: {
    forceUpdate: boolean
    success?: (data: ResourcePromptInfo[]) => void
    fail?: (err: any) => void
  }) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const _state = getState()
    const { forceUpdate = false, success, fail } = params || {}

    const _shortcut = _state.cache.promptShortcuts
    if (
      !forceUpdate &&
      _shortcut &&
      _shortcut.shortcuts &&
      _shortcut.shortcuts.length > 0 &&
      _shortcut.lastUpdate + config.promptUpdateInterval >
        getTimestampSecond()
    ) {
      logInfo('Prompt shortcuts is up to date, skip fetching')
      return
    }

    fetchResourcePromptShortcuts()
      .then((shortcuts: ResourcePromptInfo[]) => {
        logInfo(
          'Fetch prompt shortcuts success',
          shortcuts && shortcuts.length
        )
        success && success(shortcuts)
        dispatch(setShortcuts(shortcuts) as any)
      })
      .catch((_err) => {
        logInfo('Failed to fetch prompt shortcuts, skip fetching')
        fail && fail(_err)
        if (
          !_shortcut ||
          !_shortcut.shortcuts ||
          _shortcut.shortcuts.length === 0
        ) {
          dispatch(config.LocalPromptShortcuts as any)
          logInfo('Use default prompt shortcuts')
        }
      })
  }

export const updateFatureTipHistory = (feature: FeatureTipType) => ({
  type: APP_CACHE_FEATURE_TIP_HISTORY,
  payload: feature
})

export const clearConversations =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({
      type: APP_CACHE_CLEAR_CONVERSATIONS
    })
    const _state = getState()
    if (_state.chat.chat) {
      dispatch(setCurrentConversation(undefined, false) as any)
    }

    dispatch({
      type: APP_CACHE_RECENT_REMOVED_CHAT_IDS,
      payload: [
        ...Object.keys(_state.cache.conversations || {}),
        ...(_state.cache.recentRemovedChatIds || [])
      ]
    })
  }

export const setRecentRemovedChatIds = (ids: Array<string>) => ({
  type: APP_CACHE_RECENT_REMOVED_CHAT_IDS,
  payload: ids
})

export const removeConversation =
  (conversationIds: Array<string>) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({
      type: APP_CACHE_REMOVE_CONVERSATIONS,
      payload: conversationIds
    })
    const _state = getState()
    if (
      _state.chat.chat &&
      conversationIds.includes(_state.chat.chat.id)
    ) {
      dispatch(setCurrentConversation(undefined) as any)
    }
    if (
      !_state.cache.conversations ||
      Object.keys(_state.cache.conversations).length === 0
    ) {
      dispatch(initConversations() as any)
    }

    dispatch({
      type: APP_CACHE_RECENT_REMOVED_CHAT_IDS,
      payload: [
        ...conversationIds,
        ...(_state.cache.recentRemovedChatIds || [])
      ]
    })
  }
export const updateConversations =
  (
    conversations: Array<ChatConversation>,
    checkCurrentChat = false
  ) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const _state = getState()
    if (
      checkCurrentChat &&
      conversations
        .map((v) => v.id)
        .includes(_state.chat.chat?.id || 'none')
    ) {
      dispatch(
        setCurrentConversation(
          conversations.find((v) => v.id === _state.chat.chat!.id),
          false
        ) as any
      )
    }
    const newChatConversationMap = {
      ..._state.cache.conversations,
      ...conversationListToMap(conversations)
    }
    dispatch({
      type: APP_CACHE_UPDATE_CONVERSATIONS,
      payload: newChatConversationMap
    })
  }

export const setConverstaions = (
  conversations: IState.CacheState['conversations']
) => ({
  type: APP_CACHE_UPDATE_CONVERSATIONS,
  payload: conversations
})

export const initConversations =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const _state = getState()
    if (
      _state.cache.conversations &&
      Object.keys(_state.cache.conversations).length > 0
    ) {
      return
    }
    const _id_prefix = uuidv4() as string
    const conversations: ChatConversation[] = [
      newChatConversation({
        id: _id_prefix + '0'
      }),
      {
        ...newChatConversation({
          id: _id_prefix + '1',
          title: translate('chat.chatCasually'),
          prompt: ''
        }),
        perference: {
          maxMessagesInContext: 3
        }
      }
    ].concat(
      getPrompts(
        _state.setting.languageTag === 'auto'
          ? (getLocale() as LanguageTagType)
          : _state.setting.languageTag
      ).map((prompt: PromptInfo, idx: number) =>
        newChatConversation({
          id: _id_prefix + (idx + 5).toString(),
          title: prompt.title,
          prompt: prompt.prompt,
          createAt: getTimestampSecond() - idx - 1
        })
      )
    )
    dispatch(updateConversations(conversations) as any)
  }

export const syncICloudChatMateAction =
  (params?: Callbacks) =>
  async (dispatch: Dispatch, _getState: () => RootState) => {
    try {
      logInfo('Start to sync iCloud chat mate...')
      const cloud_data = await syncICloudChatMate(_getState().cache)
      if (cloud_data?.data?.conversations) {
        dispatch(setConverstaions(cloud_data.data?.conversations))
        dispatch(refreshCurrentConversion() as any)
      }
      dispatch(setICloudSyncTime())
      logInfo('Sync iCloud chat mate done.')
      params?.successCallback && params.successCallback(cloud_data)
      params?.finallyCallback && params.finallyCallback()
    } catch (error: any) {
      logInfo('syncICloudChatMateAction error:', error)
      params?.failCallback && params.failCallback(error)
      params?.finallyCallback && params.finallyCallback()
    }
  }
