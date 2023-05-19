/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { OpenAICompletionModelType } from '@src/helper'
import {
  ChatCompletionRequestMessage,
  Configuration,
  ConfigurationParameters,
  CreateAccountBillingUsageRequest,
  CreateAccountBillingUsageResponse,
  CreateAccountSubscriptionResponse,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateCompletionResponseUsage,
  ListModelsResponse,
  OpenAIApi
} from '@src/utils/openai-api'
import { AxiosRequestConfig } from 'axios'

export interface ChatConfig
  extends CreateChatCompletionRequest,
    CreateCompletionRequest {
  max_tokens?: number
  stop?: Array<string>
}

/**
 * Signle chat message token usage
 */
export interface MessageTokenUsage
  extends CreateCompletionResponseUsage {}

/**
 * A role message
 */
export interface ChatRoleMessage
  extends ChatCompletionRequestMessage {}

/**
 * one chat completion message
 */
export interface ChatMessage {
  id: string
  createAt: number
  message: ChatRoleMessage
  /**
   * If the message is from user, maybe has a prompt template
   */
  prompt?: string
  model?: OpenAICompletionModelType
  usage?: MessageTokenUsage
}

/**
 * one chat conversation
 */
export interface ChatConversation {
  id: string
  title: string
  prompt?: string
  createAt: number
  updateAt?: number
  recentInputText?: string
  perference?: {
    maxMessagesInContext?: number
  }
  config?: ChatConfig
  messages?: ChatMessage[]
}

/**
 * Chat app info
 */
export interface ChatApp {
  id: string
  locale: string
  title: string
  description: string
  prompt: string
}

export declare class ChatMateAPI {
  configuationParams?: ConfigurationParameters
  configuation?: Configuration
  openai: OpenAIApi
  defaultCompletionRequestConfig: ChatConfig
  axiosConfig: AxiosRequestConfig
  completion: CompletionAPI
  account: AccountAPI
  constructor(params?: ConfigurationParameters)
  setApiKey(apiKey: string): void
  /**
   * Set timeout for all request in seconds
   * @param timeout timeout in seconds
   */
  setTimeout(timeout: number): void
  setApiBasePath(basePath: string): void
  isChatCompletion(model: string): boolean
  listModels(): Promise<ListModelsResponse | undefined>
  returnOrError: (response: any) => any
  combineRequestConfig: (config: ChatConfig) => ChatConfig
  getApiServer: () => string
  createCompletionStream(
    requestConfig: ChatConfig,
    onData: (
      status: CompletaionStreamDataType,
      data?: CreateChatCompletionResponse
    ) => void
  ): Promise<any>
  createCompletion(
    completionRequest: ChatConfig
  ): Promise<CreateCompletionResponse | CreateCompletionResponse>
}
export interface CompletionAPI {
  createChatCompletion(
    chatCompletionRequest: CreateChatCompletionRequest
  ): Promise<CreateCompletionResponse>
  createCompletion(
    completionRequest: CreateCompletionRequest
  ): Promise<CreateCompletionResponse>
}
export interface AccountAPI {
  createAccountBillingUsage(
    createAccountBillingUsage: CreateAccountBillingUsageRequest,
    apikey?: string
  ): Promise<CreateAccountBillingUsageResponse>
  createAccountSubscription(
    apikey?: string
  ): Promise<CreateAccountSubscriptionResponse>
}
export type CompletaionStreamDataType = 'data' | 'done' | 'error'
