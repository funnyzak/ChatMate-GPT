/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import {
  OpenAIConst,
  parseCompletionResponseStream
} from '@src/helper'
import { logInfo } from '@src/helper/logger'
import {
  Configuration,
  ConfigurationParameters,
  CreateChatCompletionResponse,
  CreateCompletionResponse,
  ListModelsResponse,
  OpenAIApi
} from '@src/utils/openai-api'
import { isJsonString } from '@src/utils/utils'
import { AxiosRequestConfig } from 'axios'
import { CompletionApi, AccountApi } from './lib'
import {
  AccountAPI,
  ChatConfig,
  ChatMateAPI,
  CompletaionStreamDataType,
  CompletionAPI
} from './types'
import { translate } from '@src/i18n'
export const OPENAI_API_SERVER = 'https://api.openai.com'
export class ChatMateApi {
  configuationParams?: ConfigurationParameters = {}
  configuation: Configuration = new Configuration({
    basePath: `${OPENAI_API_SERVER}/v1`
  })
  openai: OpenAIApi = new OpenAIApi(new Configuration())
  completion: CompletionAPI = CompletionApi(this)
  account: AccountAPI = AccountApi(this)
  defaultCompletionRequestConfig: ChatConfig = {
    model: 'gpt-3.5-turbo',
    max_tokens: 2048,
    n: 1,
    stream: true
  }
  axiosConfig: AxiosRequestConfig = {
    validateStatus: (status: number) => status >= 200 && status < 508,
    timeout: 180000
  }
  constructor(params?: ConfigurationParameters) {
    this.configuationParams = params || {}
    this.configuation = params
      ? new Configuration(params)
      : this.configuation
    this.openai = new OpenAIApi(this.configuation)
  }

  setTimeout(timeout: number) {
    this.axiosConfig.timeout = timeout * 1000
  }
  setApiKey(apiKey: string): void {
    this.configuationParams!.apiKey = apiKey
    this.configuation = new Configuration(this.configuationParams)
    this.openai = new OpenAIApi(this.configuation)
  }
  setApiBasePath(basePath: string): void {
    let _baseUrl = this.getUrlServer(basePath)
    if (!_baseUrl || _baseUrl === null || _baseUrl === '') {
      _baseUrl = OPENAI_API_SERVER
    }
    _baseUrl += '/v1'
    this.configuationParams!.basePath = _baseUrl
    this.configuation = new Configuration(this.configuationParams)
    this.openai = new OpenAIApi(
      this.configuation,
      this.configuation.basePath
    )
  }
  getApiServer() {
    return this.getUrlServer(this.configuation.basePath!)!
  }
  getUrlServer(url: string) {
    // eslint-disable-next-line no-useless-escape
    const matches = url.match(/^https?\:\/\/([^\/?#]+)/i)
    const _server = matches && matches[0]
    return _server === null ? undefined : _server
  }
  async listModels(): Promise<ListModelsResponse | undefined> {
    const data = await this.openai?.listModels()
    return data?.data
  }
  isChatCompletion(model: string) {
    return OpenAIConst.MODELS.CHAT_COMPLETIONS.indexOf(model) !== -1
  }
  combineRequestConfig(config: ChatConfig) {
    return {
      ...this.defaultCompletionRequestConfig,
      ...config
    }
  }
  returnOrError(response: any) {
    const { data, status } = response
    if (status === 200) return data

    logInfo('Api Error', data)
    return new Error(
      status !== 200 && (data as any).error
        ? (data as any).error.message
        : 'An error occurred during OpenAI request, Status Code: ' +
          status.toString()
    )
  }
  async createCompletion(
    completionRequest: ChatConfig
  ): Promise<CreateCompletionResponse | CreateCompletionResponse> {
    return this.isChatCompletion(completionRequest.model!)
      ? this.completion.createChatCompletion(completionRequest)
      : this.completion.createCompletion(completionRequest)
  }
  async createCompletionStream(
    requestConfig: ChatConfig,
    onData: (
      status: CompletaionStreamDataType,
      data?: CreateChatCompletionResponse
    ) => void
  ) {
    try {
      const onDownloadProgress = (progressEvent: any) => {
        const chunk = progressEvent.event.currentTarget.response
        if (!chunk || chunk === null || chunk === '') return
        const chunkStr = chunk.toString()
        // logInfo('createCompletionStream chunk string', chunkStr)
        if (isJsonString(chunkStr) && JSON.parse(chunkStr).error) {
          const errorJson = JSON.parse(chunkStr)
          onData(
            'error',
            new Error(
              errorJson.error?.message
                ? errorJson.error?.message
                : 'An error occurred during OpenAI request'
            ) as any
          )
          return
        }
        onData('data', parseCompletionResponseStream(chunkStr))
      }
      const axiosConfig: AxiosRequestConfig = {
        ...this.axiosConfig,
        onDownloadProgress
      }
      const response = this.isChatCompletion(requestConfig.model!)
        ? await this.openai!.createChatCompletion(
            requestConfig,
            axiosConfig
          )
        : await this.openai!.createCompletion(
            requestConfig,
            axiosConfig
          )
      const data = this.returnOrError(response)
      if (data instanceof Error) throw data
      return parseCompletionResponseStream(data, requestConfig)
    } catch (error: any) {
      logInfo('createChatCompletionStream error', error)

      const _error_name = error.name
      if (_error_name === 'AxiosError') {
        throw new Error(translate('errors.networkError'))
      } else {
        throw error
      }
    }
  }
}
const chat_mate_api: ChatMateAPI = new ChatMateApi({})
export default chat_mate_api
export class ApiError extends Error {
  constructor(message: string, public errorCode: number) {
    super(message)
    this.name = 'ApiError'
  }
}
