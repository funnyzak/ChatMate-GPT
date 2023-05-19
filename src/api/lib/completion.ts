/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-10.
 */

import { logInfo } from '@src/helper/logger'
import { ChatMateAPI, CompletionAPI } from '@src/types'
import {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateCompletionRequest,
  CreateCompletionResponse
} from '@src/utils/openai-api'
export default (api: ChatMateAPI): CompletionAPI => ({
  createChatCompletion: async (
    requestConfig: CreateChatCompletionRequest
  ): Promise<CreateChatCompletionResponse> => {
    const response = await api.openai!.createChatCompletion(
      requestConfig,
      api.axiosConfig
    )
    logInfo('createChatCompletion', JSON.stringify(response))
    const data = api.returnOrError(response)
    if (data instanceof Error) throw data
    return data
  },
  createCompletion: async (
    requestConfig: CreateCompletionRequest
  ): Promise<CreateCompletionResponse> => {
    const response = await api.openai!.createCompletion(
      requestConfig,
      api.axiosConfig
    )
    logInfo('createCompletion', JSON.stringify(response))
    const data = api.returnOrError(response)
    if (data instanceof Error) throw data
    return data
  }
})
