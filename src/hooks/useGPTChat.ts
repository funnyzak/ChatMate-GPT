/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-18.
 */

import { setChatError, setChatStatus } from '@src/actions'
import OpenAIApi from '@src/api'
import {
  ChatConfig,
  ChatMessage,
  CompletaionStreamDataType
} from '@src/api/types'
import {
  OpenAICompletionModelType,
  OpenAIModelMaxToken
} from '@src/helper'
import {
  calcRequestTokens,
  createCompletionRequestPromptOrMessage,
  logInfo,
  useQuickAction
} from '@src/helper'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { ChatConversation } from '@src/types'
import {
  CreateChatCompletionResponse,
  CreateCompletionResponse
} from '@src/utils/openai-api'
import { useCallback, useEffect, useMemo, useState } from 'react'
export const useGPTChat = (conversation?: ChatConversation) => {
  const dispatch = useAppDispatch()
  const { showMsg } = useQuickAction()
  const {
    openAISetting,
    app,
    chat: { messageStreaming, requesting, messageError }
  } = useAppSelector((state) => state)
  const model = useMemo(
    () => conversation?.config?.model ?? openAISetting.model,
    [conversation?.config?.model, openAISetting.model]
  )
  const maxTokensSetting = useMemo(() => {
    const _type =
      conversation?.perference?.maxMessagesInContext &&
      conversation?.perference?.maxMessagesInContext > 0
        ? 'maxMessagesInContext'
        : 'maxTokensPerReply'

    return {
      type: _type,
      value:
        _type === 'maxMessagesInContext'
          ? openAISetting.maxTokensInContext
          : openAISetting.maxTokensPerReply
    }
  }, [
    conversation?.perference?.maxMessagesInContext,
    openAISetting.maxTokensInContext,
    openAISetting.maxTokensPerReply
  ])
  const [gptResponse, setGptResponse] = useState<
    CreateChatCompletionResponse | CreateCompletionResponse
  >()
  useEffect(() => {
    resetGptChat()
  }, [conversation?.id])
  const resetGptChat = useCallback(() => {
    dispatch(setChatStatus(false, false))
    dispatch(setChatError(undefined))
    setGptResponse(undefined)
  }, [conversation?.id])
  const getRecentChatMessageFromUser = useCallback(():
    | ChatMessage
    | undefined => {
    if (!conversation?.messages) return undefined
    const userMessages = conversation?.messages
      .filter((message) => message.message.role === 'user')
      .sort((a, b) => b.createAt - a.createAt)
    return userMessages.length === 0 ? undefined : userMessages[0]
  }, [conversation?.messages])
  const GptRequest = useCallback(
    async ({
      messages,
      successHandle,
      errorHandle,
      stream = true,
      ...rest
    }: {
      messages?: ChatMessage[]
      stream?: boolean
      finally?: () => void
      successHandle?: (
        response?: CreateChatCompletionResponse
      ) => void
      errorHandle?: (error: any) => void
    }) => {
      if (!conversation) return
      const userMessage =
        messages && messages.length > 0
          ? messages[0]
          : getRecentChatMessageFromUser()
      if (!userMessage) {
        rest.finally && rest.finally()
        return
      }
      resetGptChat()
      dispatch(setChatStatus(true, false))

      const completionRequestConfig: ChatConfig = {
        ...OpenAIApi.defaultCompletionRequestConfig,
        ...conversation?.config,
        ...createCompletionRequestPromptOrMessage(
          conversation,
          userMessage.message,
          model
        ),
        // user: app.deviceInfo?.uniqueId, //A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
        model,
        temperature:
          conversation?.config?.temperature ??
          openAISetting.temperature,
        top_p: openAISetting.top_p,
        stream: stream
      }
      let promptTokens = calcRequestTokens(completionRequestConfig) // calc prompt token count
      let max_tokens = maxTokensSetting.value + promptTokens
      let model_max_tokens =
        OpenAIModelMaxToken[model as OpenAICompletionModelType]
      max_tokens =
        max_tokens > model_max_tokens
          ? model_max_tokens - promptTokens
          : maxTokensSetting.value

      completionRequestConfig.max_tokens = max_tokens

      // set unique identifier
      if (
        openAISetting.apiIdentifier &&
        openAISetting.apiIdentifier.length > 0
      )
        completionRequestConfig.user = openAISetting.apiIdentifier

      logInfo(
        'GptRequest params',
        'promptTokens: ' + promptTokens,
        'model_max_tokens: ' + model_max_tokens,
        'maxTokensSetting: ' + maxTokensSetting,
        'max_tokens: ' + max_tokens,
        JSON.stringify(completionRequestConfig)
      )

      const _OnError = (error: any) => {
        showMsg({
          text2: error.message,
          type: 'error',
          visibilityTime: 3500
        })
        logInfo('GptResponse Error', error)
        dispatch(setChatStatus(false, false))
        dispatch(setChatError(error))
        errorHandle && errorHandle(error)
        rest.finally && rest.finally()
      }

      if (max_tokens <= 0) {
        _OnError({
          message: translate(`${maxTokensSetting.type}Errror`)
        })
        return
      }

      if (stream) {
        dispatch(setChatStatus(true, true))
        OpenAIApi.createCompletionStream(
          completionRequestConfig,
          (
            status: CompletaionStreamDataType,
            response?: CreateChatCompletionResponse
          ) => {
            if (status === 'error') {
              _OnError(response)
            } else if (status === 'data') {
              dispatch(setChatStatus(true, true))
              setGptResponse(response)
            }
          }
        )
          .then((response?: CreateChatCompletionResponse) => {
            setGptResponse(response)
            dispatch(setChatStatus(false, false))
            logInfo(
              'GptResponse Stream Data Rlt',
              JSON.stringify(response)
            )
            successHandle && successHandle(response)
          })
          .catch((error: any) => {
            _OnError(error)
          })
      } else {
        OpenAIApi.createCompletion(completionRequestConfig)
          .then(
            (
              response:
                | CreateChatCompletionResponse
                | CreateCompletionResponse
            ) => {
              dispatch(setChatStatus(false, false))
              setGptResponse(response)
              logInfo('GptResponse Info', JSON.stringify(response))
              successHandle && successHandle(response)
            }
          )
          .catch((error: any) => {
            showMsg({
              text2: error.message,
              type: 'error',
              visibilityTime: 3500
            })
            dispatch(setChatStatus(false, false))
            dispatch(setChatError(error))
            logInfo('GptResponse Error', error)
            errorHandle && errorHandle(error)
            rest.finally && rest.finally()
          })
      }
    },
    [conversation, openAISetting, model, maxTokensSetting]
  )
  return {
    getRecentChatMessageFromUser,
    GptRequest,
    requesting,
    messageError,
    messageStreaming,
    gptResponse,
    resetGptChat
  }
}
