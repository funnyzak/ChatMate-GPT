/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-10.
 */

import { ApiServersInitData } from '@src/config'
import {
  OpenAICompletionModelType,
  OpenAIConst,
  OpenAIModels
} from '@src/helper'
import {
  APP_API_SERVERS_UPDATE,
  APP_SETTING_API_IDENTIFIER,
  APP_SETTING_API_KEY,
  APP_SETTING_API_SERVER,
  APP_SETTING_CHAT_MODEL,
  APP_SETTING_MAX_MESSAGES_IN_CONTEXT,
  APP_SETTING_MAX_TOKENS_IN_CONTEXT,
  APP_SETTING_MAX_TOKENS_PER_REPLY,
  APP_SETTING_NETWORK_TIMEOUT,
  APP_SETTING_OPENAI_TEMPERATURE,
  APP_SETTING_RENDER_MD,
  APP_SETTING_SHOW_ESTIMATED_TOKEN_COUNT,
  APP_SETTING_SHOW_MODEL_NAME,
  APP_SETTING_SHOW_WORD_COUNT,
  Action,
  IState
} from '../types'
const INITIAL_STATE: IState.OpenAISettingState = {
  apiKey: '',
  apiServer: OpenAIConst.API_SERVERS[0],
  model: OpenAIModels[0] as OpenAICompletionModelType,
  maxMessagesInContext: 0,
  maxTokensInContext: 4000,
  maxTokensPerReply: 4000,
  showModelName: true,
  showWordCount: true,
  showEstimatedTokenCount: true,
  renderMd: false,
  temperature: 0.7,
  n: 1,
  stop: [],
  top_p: 1,
  networkTimeout: 60,
  apiServers: ApiServersInitData
}
export default (
  state: IState.OpenAISettingState = INITIAL_STATE,
  action: Action
): IState.OpenAISettingState => {
  switch (action.type) {
    case APP_API_SERVERS_UPDATE:
      return { ...state, apiServers: action.payload }
    case APP_SETTING_API_IDENTIFIER:
      return { ...state, apiIdentifier: action.payload }
    case APP_SETTING_NETWORK_TIMEOUT:
      return { ...state, networkTimeout: action.payload }
    case APP_SETTING_API_KEY:
      return { ...state, apiKey: action.payload }
    case APP_SETTING_API_SERVER:
      return { ...state, apiServer: action.payload }
    case APP_SETTING_CHAT_MODEL:
      return { ...state, model: action.payload }
    case APP_SETTING_MAX_MESSAGES_IN_CONTEXT:
      return { ...state, maxMessagesInContext: action.payload }
    case APP_SETTING_MAX_TOKENS_IN_CONTEXT:
      return { ...state, maxTokensInContext: action.payload }
    case APP_SETTING_MAX_TOKENS_PER_REPLY:
      return { ...state, maxTokensPerReply: action.payload }
    case APP_SETTING_SHOW_MODEL_NAME:
      return { ...state, showModelName: action.payload }
    case APP_SETTING_SHOW_WORD_COUNT:
      return { ...state, showWordCount: action.payload }
    case APP_SETTING_SHOW_ESTIMATED_TOKEN_COUNT:
      return { ...state, showEstimatedTokenCount: action.payload }
    case APP_SETTING_RENDER_MD:
      return { ...state, renderMd: action.payload }
    case APP_SETTING_OPENAI_TEMPERATURE:
      return { ...state, temperature: action.payload }
    default:
      return state
  }
}
