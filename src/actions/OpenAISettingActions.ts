/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-10.
 */

import OpenApi from '@src/api'
import {
  OpenAICompletionModelType,
  getSettingApiServer,
  logInfo
} from '@src/helper'
import { Dispatch } from 'redux'
import {
  APP_SETTING_API_IDENTIFIER,
  APP_SETTING_API_KEY,
  APP_SETTING_API_SERVER,
  APP_SETTING_CHAT_MODEL,
  APP_SETTING_MAX_MESSAGES_IN_CONTEXT,
  APP_SETTING_MAX_TOKENS_IN_CONTEXT,
  APP_SETTING_MAX_TOKENS_PER_REPLY,
  APP_SETTING_NETWORK_TIMEOUT,
  APP_SETTING_OPENAI_TEMPERATURE,
  APP_API_SERVERS_UPDATE,
  APP_API_SERVERS_REMOVE,
  APP_SETTING_RENDER_MD,
  APP_SETTING_SHOW_ESTIMATED_TOKEN_COUNT,
  APP_SETTING_SHOW_MODEL_NAME,
  APP_SETTING_SHOW_WORD_COUNT,
  ApiServerInfo
} from '../types'
import { RootState } from '@src/store'
import OpenAIApi from '@src/api'

export type { OpenAICompletionModelType } from '@src/helper'

export const setApiKey = (apiKey: string) => ({
  type: APP_SETTING_API_KEY,
  payload: apiKey
})

export const updateApiKey =
  (apiKey: string) => async (dispatch: Dispatch) => {
    OpenApi.setApiKey(apiKey)
    dispatch(setApiKey(apiKey))
  }

export const setApiIdentifier = (apiIdentifier: string) => ({
  type: APP_SETTING_API_IDENTIFIER,
  payload: apiIdentifier
})

export const setNetworkTimeout =
  (networkTimeout: number) => async (dispatch: Dispatch) => {
    OpenApi.setTimeout(networkTimeout)
    dispatch({
      type: APP_SETTING_NETWORK_TIMEOUT,
      payload: networkTimeout
    })
  }

export const setApiServer = (apiServer: string) => ({
  type: APP_SETTING_API_SERVER,
  payload: apiServer
})

export const updateApiServers =
  (updateServers: ApiServerInfo[]) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const {
      openAISetting: { apiServers }
    } = getState()
    updateServers.forEach((item: ApiServerInfo) => {
      const index = apiServers.findIndex(
        (server) => server.id === item.id
      )
      if (index > -1) {
        apiServers[index] = item
      } else {
        apiServers.push(item)
      }
    })

    const _usingServer = apiServers.find(
      (_server: ApiServerInfo) => _server.use
    )
    if (!_usingServer) {
      apiServers[0].use = true
    }

    OpenAIApi.setApiBasePath(getSettingApiServer(apiServers))

    dispatch(setApiServers(apiServers))
  }

export const setApiServers = (apiServers: ApiServerInfo[]) => ({
  type: APP_API_SERVERS_UPDATE,
  payload: apiServers
})

export const removeApiServer =
  (ids: string[]) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    if (!ids.length) return

    const _server = getState().openAISetting.apiServers.filter(
      (server) => !ids.includes(server.id)
    )

    if (!_server.find((server) => server.use)) {
      _server[0].use = true
    }

    OpenAIApi.setApiBasePath(
      _server.find((server) => server.use)!.serverHost
    )

    dispatch(setApiServers(_server))
  }

export const setApiServerUse =
  (id: string) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { apiServers } = getState().openAISetting
    const newApiServers = apiServers.map(
      (apiServer: ApiServerInfo) => {
        apiServer.use = apiServer.id === id
        return apiServer
      }
    )
    OpenAIApi.setApiBasePath(getSettingApiServer(newApiServers))

    dispatch(setApiServers(newApiServers))
  }

export const updateApiServer =
  (apiServer: string) => async (dispatch: Dispatch) => {
    OpenApi.setApiBasePath(apiServer)

    dispatch(setApiServer(apiServer))
  }

export const setChatModel = (
  chatModel: OpenAICompletionModelType
) => ({
  type: APP_SETTING_CHAT_MODEL,
  payload: chatModel
})

export const setTemperature = (temperature: number) => ({
  type: APP_SETTING_OPENAI_TEMPERATURE,
  payload:
    temperature !== undefined
      ? Math.round(temperature * 100) / 100
      : temperature
})

export const setMaxMessagesInContext = (chatLimitCount: number) => ({
  type: APP_SETTING_MAX_MESSAGES_IN_CONTEXT,
  payload: chatLimitCount
})

export const setMaxTokensInContext = (
  maxTokensInContext: number
) => ({
  type: APP_SETTING_MAX_TOKENS_IN_CONTEXT,
  payload: maxTokensInContext
})

export const setMaxTokensPerReply = (maxTokensPerReply: number) => ({
  type: APP_SETTING_MAX_TOKENS_PER_REPLY,
  payload: maxTokensPerReply
})

export const setShowModelName = (showModelName: boolean) => ({
  type: APP_SETTING_SHOW_MODEL_NAME,
  payload: showModelName
})

export const setShowWordCount = (showWordCount: boolean) => ({
  type: APP_SETTING_SHOW_WORD_COUNT,
  payload: showWordCount
})

export const setShowEstimatedTokenCount = (
  showEstimatedTokenCount: boolean
) => ({
  type: APP_SETTING_SHOW_ESTIMATED_TOKEN_COUNT,
  payload: showEstimatedTokenCount
})

export const setRenderMd = (renderMd: boolean) => ({
  type: APP_SETTING_RENDER_MD,
  payload: renderMd
})
