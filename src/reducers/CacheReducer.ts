/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { config } from '@src/config'
import { filterConversationMap } from '@src/helper/conversation'
import {
  APP_CACHE_CLEAR_CONVERSATIONS,
  APP_CACHE_FEATURE_TIP_HISTORY,
  APP_CACHE_REMOVE_CONVERSATIONS,
  APP_CACHE_SHORTCUTS,
  APP_CACHE_UPDATE_CONVERSATIONS,
  APP_CACHE_RECENT_REMOVED_CHAT_IDS,
  APP_SHORTCUT_FILTER_SETTING,
  Action,
  FeatureTipType,
  IState
} from '../types'
const INITIAL_STATE: IState.CacheState = {
  conversations: {},
  promptShortcuts: {
    lastUpdate: 0,
    shortcuts: config.LocalPromptShortcuts as any
  }
}
export default (
  state: IState.CacheState = INITIAL_STATE,
  action: Action
): IState.CacheState => {
  switch (action.type) {
    case APP_CACHE_RECENT_REMOVED_CHAT_IDS:
      return {
        ...state,
        recentRemovedChatIds: action.payload
      }
    case APP_CACHE_FEATURE_TIP_HISTORY:
      return {
        ...state,
        featureTipsHistory: {
          ...state.featureTipsHistory,
          [action.payload]:
            ((state.featureTipsHistory || {})[
              action.payload as FeatureTipType
            ] || 0) + 1
        }
      }
    case APP_SHORTCUT_FILTER_SETTING:
      return {
        ...state,
        shortcutFilterSetting: action.payload
      }
    case APP_CACHE_UPDATE_CONVERSATIONS:
      // logInfo('APP_CACHE_UPDATE_CONVERSATIONS', action.payload)
      return {
        ...state,
        conversations: action.payload
      }
    case APP_CACHE_SHORTCUTS:
      return {
        ...state,
        promptShortcuts: action.payload
      }
    case APP_CACHE_REMOVE_CONVERSATIONS:
      const conversationIds = action.payload as Array<string>
      if (!state.conversations) {
        return state
      }
      return {
        ...state,
        conversations: filterConversationMap(
          state.conversations,
          (conversation) =>
            conversationIds.indexOf(conversation.id) === -1
        )
      }
    case APP_CACHE_CLEAR_CONVERSATIONS:
      return {
        ...state,
        conversations: {}
      }
    default:
      return state
  }
}
