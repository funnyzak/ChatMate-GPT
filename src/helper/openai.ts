/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-05.
 */

import {
  ChatConfig,
  ChatConversation,
  ChatRoleMessage,
  MessageTokenUsage
} from '@src/types'
import { getUrlServer } from '@src/utils'
import { gptTokenizerEncode } from '@src/utils/gpt'
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
  CreateCompletionResponse
} from '@src/utils/openai-api'
import { logInfo } from './logger'

export const OpenAIConst = {
  API_SERVERS: ['https://api.openai.com'],
  FAQ: 'https://help.openai.com',
  LINKS: {
    Help: {
      API_USER:
        'https://platform.openai.com/docs/guides/safety-best-practices'
    }
  },
  MODELS: {
    COMPLETIONS: ['text-davinci-003', 'text-davinci-002', 'davinci'],
    CHAT_COMPLETIONS: [
      'gpt-3.5-turbo-0301',
      'gpt-3.5-turbo',
      'gpt-4',
      'gpt-4-0314',
      'gpt-4-32k',
      'gpt-4-32k-0314'
    ]
  }
}
export const OpenAIModels =
  OpenAIConst.MODELS.CHAT_COMPLETIONS.concat(
    OpenAIConst.MODELS.COMPLETIONS
  )
export type OpenAICompletionModelType =
  | 'gpt-3.5-turbo'
  | 'gpt-3.5-turbo-0301'
  | 'text-davinci-003'
  | 'text-davinci-002'
  | 'davinci'
  | 'gpt-4'
  | 'gpt-4-0314'
  | 'gpt-4-32k'
  | 'gpt-4-32k-0314'

export const OpenAIModelMaxToken: {
  [key in OpenAICompletionModelType]: number
} = {
  'gpt-3.5-turbo': 4000,
  'gpt-3.5-turbo-0301': 4000,
  'gpt-4': 8192,
  'gpt-4-0314': 8192,
  'gpt-4-32k': 32768,
  'gpt-4-32k-0314': 32768,
  'text-davinci-003': 4097,
  'text-davinci-002': 4097,
  'davinci': 2049
}

export interface OpenAIAPITokenCost {
  prompt: number
  completion: number
  total: number
}

/**
 * Get OpenAI Model every thousand tokens price
 * price=>https://openai.com/pricing
 * gpt4=>https://openai.com/waitlist/gpt-4-api
 * @param model
 * @returns
 */
export const openAIModelThousandsPrice = (model?: string) => {
  const defaultPrice = {
    prompt: 0.002,
    completion: 0.002
  }
  let everyThousandTokensCost = defaultPrice
  switch (model) {
    case 'davinci':
    case 'text-davinci-002':
    case 'text-davinci-003':
      everyThousandTokensCost = {
        prompt: 0.12,
        completion: 0.12
      }
      break
    case 'gpt-4':
    case 'gpt-4-0314':
      everyThousandTokensCost = {
        prompt: 0.03,
        completion: 0.06
      }
      break
    case 'gpt-4-32k':
    case 'gpt-4-32k-0314':
      everyThousandTokensCost = {
        prompt: 0.06,
        completion: 0.12
      }
      break
    default:
      everyThousandTokensCost = defaultPrice
      break
  }
  // logInfo('openAIModelThousandsPrice', model, everyThousandTokensCost)
  return everyThousandTokensCost
}

/**
 * Calculate the cost of the OpenAI API token
 * https://openai.com/pricing#language-models
 * @param tokens
 * @param model
 */
export const calcOpenAIApiTokenCost = (
  usage?: MessageTokenUsage,
  model?: string
): OpenAIAPITokenCost | undefined => {
  if (!usage) return undefined

  let everyThousandTokensCost = openAIModelThousandsPrice(model)
  let promptCost = usage.prompt_tokens
    ? (usage.prompt_tokens / 1000) * everyThousandTokensCost.prompt
    : 0
  let completionCost = usage.completion_tokens
    ? (usage.completion_tokens / 1000) *
      everyThousandTokensCost.completion
    : 0
  return {
    prompt: Math.round(promptCost * 100000) / 100000,
    completion: Math.round(completionCost * 100000) / 100000,
    total: Math.round((promptCost + completionCost) * 100000) / 100000
  }
}

/**
 * Generate a prompt, the content in the prompt is occupied by ### or [content]
 * @param chat
 * @param message
 * @returns
 */
export const calcChatCompletionRequestMessagesTokens = (
  messages: ChatCompletionRequestMessage[]
) => {
  return messages.reduce((total, message) => {
    return total + gptTokenizerEncode(message.content).length
  }, 0)
}
export const calcCompletionRequesPromptTokens = (prompt: string) => {
  return gptTokenizerEncode(prompt).length
}
export const calcRequestTokens = (chatConfig: ChatConfig) => {
  const { prompt, messages } = chatConfig
  if (!prompt && !messages) return 0
  return prompt && prompt.length > 0
    ? calcCompletionRequesPromptTokens(prompt as string)
    : calcChatCompletionRequestMessagesTokens(messages || [])
}
export const isChatCompletionModel = (model: string) => {
  return OpenAIConst.MODELS.CHAT_COMPLETIONS.indexOf(model) !== -1
}
export const createCompletionRequestPromptOrMessage = (
  chat: ChatConversation,
  message: ChatRoleMessage,
  model: string
): ChatConfig => {
  if (isChatCompletionModel(model)) {
    return {
      ...chat.config,
      messages: createChatCompletionRequestMessages(chat, message)
    }
  }
  return {
    ...chat.config,
    prompt: createCompletionRequestPrompt(chat, message)
  }
}

/**
 * 匹配占位符如下（中间可含1到35个字符）：
[输入内容]
「输入内容」
『输入内容』
【输入内容】
【你好」
［你好］
 */
export const PromptPlacehoderTestRule =
  /(\[|［|「|『|【)([^\]］」』】]{1,35})(\]|］|』|】|」)/g

/**
 * replace the prompt content
 * @param prompt the prompt can contain [#..]
 * @param content the content to replace. if the prompt is null, return the content。内容中如果有换行，则会被分隔，替换成与prompt占位符对应的位置。如果内容分隔大于占位符数量，则会将多余的内容拼接到prompt后面
 * @returns
 */
export const replacePrompt = (prompt?: string, content?: string) => {
  // logInfo('replacePrompt', prompt, content)
  return parsePrompt(prompt, content, PromptPlacehoderTestRule, '\n')
    .result
}
export const replacePromp2 = (prompt?: string, content?: string) => {
  // logInfo('replacePrompt2', prompt, content)
  return parsePrompt(prompt, content, PromptPlacehoderTestRule, '\n')
}
/**
 * 使用内容文本替换提示词模板. 内容中如果有内容分隔符，则会被分隔，替换成与prompt占位符对应的位置。如果内容分隔大于占位符数量，则会将多余的内容拼接到prompt后面
 * @returns
 * @param prompt the prompt template
 * @param content the content to replace
 * @param holderRegex the placeholder regex to search prompt template
 * @param contentSplit the content split to replace the placeholder
 * @returns
 */
function parsePrompt(
  prompt?: string,
  content?: string,
  holderRegex = /[[#]+]/g,
  contentSplit = '\n'
) {
  let _prompt = prompt ?? ''
  let _content = content ?? ''
  const placeholders = prompt ? prompt.match(holderRegex) : undefined
  if (placeholders) {
    const replacementArr = _content.split(contentSplit)
    for (let i = 0; i < placeholders.length; i++) {
      _prompt = _prompt.replace(
        placeholders[i],
        replacementArr[i] || ''
      )
    }
    if (replacementArr.length > placeholders.length) {
      _prompt += replacementArr
        .slice(placeholders.length)
        .join(contentSplit)
    }
  } else {
    _prompt = _prompt + _content
  }
  return {
    prompt,
    content,
    holderRegex,
    contentSplit,
    result: _prompt,
    match: holderRegex.test(prompt || '')
  }
}
export const createCompletionRequestPrompt = (
  chat: ChatConversation,
  message: ChatRoleMessage
): string => {
  let prompt_rlt = (chat.prompt || '') + message.content
  const maxMessage = chat.perference?.maxMessagesInContext
  if (maxMessage && maxMessage > 0 && chat.messages) {
    const messages = chat.messages.slice(-maxMessage)
    prompt_rlt = [...messages]
      .map((v) => replacePrompt(v.prompt || '', v.message.content))
      .join('\n\n')
      .concat(
        '\n\n',
        replacePrompt(chat.prompt || '', message.content)
      )
  } else {
    return replacePrompt(chat.prompt || '', message.content)
  }
  return prompt_rlt
}
export const createChatCompletionRequestMessages = (
  chat: ChatConversation,
  message: ChatRoleMessage
): Array<ChatCompletionRequestMessage> => {
  const maxMessage = chat.perference?.maxMessagesInContext
  // logInfo(
  //   'createChatCompletionRequestMessages',
  //   maxMessage,
  //   'chat',
  //   chat,
  //   'message',
  //   message
  // )
  if (maxMessage !== undefined && maxMessage > 0 && chat.messages) {
    // If the chat conversation has a max messages in context
    return chat.messages
      .slice(-maxMessage)
      .map((v) => ({
        role: v.message.role,
        content: replacePrompt(v.prompt || '', v.message.content)
      }))
      .concat([message])
  }
  const _replace = replacePromp2(chat.prompt || '', message.content)
  return _replace.match || !chat.prompt || chat.prompt.length === 0
    ? [
        {
          role: 'user',
          content: _replace.result
        }
      ]
    : [
        {
          role: 'system',
          content: chat.prompt
        },
        {
          role: 'user',
          content: message.content
        }
      ]
}
export const getOpenAIModels = async (
  apiKey: string,
  apiServer?: string
) => {
  const _server =
    apiServer && apiServer.length > 0
      ? getUrlServer(apiServer)
      : 'https://api.openai.com'

  const url = `${_server}/v1/models`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`
    }
  }
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    logInfo('getOpenAIModels', url, JSON.stringify(options), data)
    if (data.error) {
      return Promise.reject(new Error(data.error.message))
    }
    return data
  } catch (_err) {
    logInfo('getOpenAIModels', _err)
    return Promise.reject(
      new Error('Request failed, maybe the API key is invalid.')
    )
  }
}
export const verifyOpenAIAPIKey = async (
  apiKey: string,
  apiServer?: string
) => {
  const _server =
    apiServer && apiServer.length > 0
      ? getUrlServer(apiServer)
      : 'https://api.openai.com'

  const url = `${_server}/v1/engines/davinci/completions`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }
  const body = {
    prompt: 'This is a test',
    max_tokens: 5,
    temperature: 0.9,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    stop: ['\n']
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    const data = await response.json()
    logInfo(
      'verifyOpenAIAPIKey',
      url,
      JSON.stringify(headers),
      data,
      data
    )
    if (data.error) {
      return Promise.reject(new Error(data.error.message))
    }
    return data
  } catch (_err) {
    logInfo('verifyOpenAIAPIKey', _err)
    return Promise.reject(
      new Error('Request failed, maybe the API key is invalid.')
    )
  }
}
export const verifyOpenAIAPIServer = async (
  serverUrl: string
): Promise<any> => {
  try {
    const response = await fetch(serverUrl, { method: 'GET' })
    logInfo('verifyOpenAIAPIServer', response)
    if (
      response.status === 200 ||
      (response.status >= 400 && response.status < 500)
    ) {
      return await response.text()
    }
    throw new Error('Request failed, Network response was not ok.')
  } catch (error: any) {
    logInfo('verifyOpenAIAPIServer', error)
    return Promise.reject(
      new Error(
        'Request failed, maybe the API server is invalid.' +
          error.message
      )
    )
  }
}
export const gptMessageContent = (
  gptMessage?: CreateChatCompletionResponse | CreateCompletionResponse
): string | undefined => {
  const _gptResp = gptMessage as any
  if (!_gptResp) return undefined
  return hasChatCompletionMessageContent(_gptResp)
    ? _gptResp!.choices[0]!.message!.content
    : hastCompletionText(_gptResp)
    ? _gptResp!.choices[0]!.text
    : undefined
}
export const hasChatCompletionMessageContent = (
  gptMessage?: CreateChatCompletionResponse
) =>
  gptMessage &&
  gptMessage.choices &&
  gptMessage.choices.length > 0 &&
  gptMessage.choices[0].message &&
  gptMessage.choices[0].message.content
export const hastCompletionText = (
  gptMessage?: CreateCompletionResponse
) =>
  gptMessage &&
  gptMessage.choices &&
  gptMessage.choices.length > 0 &&
  gptMessage.choices[0].text
export const parseCompletionResponseStream = (
  streamText: string,
  requestConfig?: ChatConfig
): CreateChatCompletionResponse | undefined => {
  const messageList = []
  const lines = streamText
    .split('\n')
    .filter((line: string) => line.trim() !== '')
    .map((line: string) => line.replace(/^data: /, ''))
  let newContent = ''
  for (const line of lines) {
    try {
      const messageData = JSON.parse(line)
      const hasChatCompletionContent =
        messageData.choices &&
        messageData.choices.length > 0 &&
        messageData.choices[0].delta &&
        messageData.choices[0].delta.content
      const hasCompletionText =
        messageData.choices &&
        messageData.choices.length > 0 &&
        messageData.choices[0].text
      const _message = hasChatCompletionContent
        ? messageData.choices[0].delta.content
        : hasCompletionText
        ? messageData.choices[0].text
        : undefined
      if (_message) {
        messageList.push(messageData)
        newContent += _message
      }
    } catch (error) {
      logInfo('Could not JSON parse stream message', line, error)
    }
  }
  if (messageList && messageList.length > 0) {
    const _rlt: CreateChatCompletionResponse = {
      id: messageList[0].id,
      object: messageList[0]!.object.toString().replace('.chunk', ''),
      model: messageList[0]!.model,
      created: parseInt((new Date().getTime() / 1000).toString(), 10),
      choices: [
        {
          message: {
            role: 'assistant',
            content: newContent
          }
        }
      ]
    }
    if (requestConfig) {
      const prompt_tokens = calcRequestTokens(requestConfig)
      const completion_tokens = gptTokenizerEncode(newContent).length
      _rlt.usage = {
        prompt_tokens,
        completion_tokens,
        total_tokens: prompt_tokens + completion_tokens
      }
    }
    return _rlt
  }
  return undefined
}
