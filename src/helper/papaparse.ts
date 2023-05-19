/**
 * Created by Leon<silenceace@gmail.com> at 2023-05-08.
 */

import { ChatConversation, LanguageTagType } from '@src/types'
import dayjs from 'dayjs'
import Papa from 'papaparse'
import { logInfo } from './logger'
import { Chat } from '@src/screens'
import { translate } from '@src/i18n'

export interface ChatConversationCsvMessage {
  chatId: string
  chatTitle: string
  chatCreateTime: number
  chatPrompt: string
  chatModel: string
  messageId: string
  messageTime: number
  role: string
  messageContent: string
  tokenCount?: number
  charLength: number
}

export const unParseChatConversationsCsv = (
  list: Array<ChatConversation>,
  options: Papa.UnparseConfig = CSV_PapaParse_UnParse_Options
): string | undefined => {
  let cvsMessages: Array<ChatConversationCsvMessage> = []
  list.forEach((conversation: ChatConversation) => {
    if (
      conversation &&
      conversation.messages &&
      conversation.messages.length > 0
    ) {
      conversation.messages.forEach((message) => {
        cvsMessages.push({
          chatId: conversation.id,
          chatTitle: conversation.title,
          chatCreateTime: conversation.createAt,
          chatPrompt: message.prompt ?? '',
          chatModel: message.model ?? '',
          messageId: message.id,
          messageTime: message.createAt,
          role: message.message.role,
          messageContent: message.message.content,
          tokenCount: message.usage?.total_tokens ?? undefined,
          charLength: message.message.content.length
        })
      })
    }
  })
  const papaRlt = Papa.unparse(
    {
      fields: translate('export.csvHeaders').split(','),
      data: cvsMessages.map((message: ChatConversationCsvMessage) => {
        return [
          message.chatId,
          message.chatTitle,
          dayjs(message.chatCreateTime * 1000).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          message.chatPrompt,
          message.chatModel,
          message.messageId,
          dayjs(message.messageTime * 1000).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          message.role,
          message.messageContent,
          message.tokenCount,
          message.charLength
        ]
      })
    },
    options
  )
  logInfo('ParseChatConversationsCsv', 'papaRlt', papaRlt)
  return papaRlt
}

// https://www.papaparse.com/docs#json-to-csv
export const CSV_PapaParse_UnParse_Options: Papa.UnparseConfig = {
  quotes: false, //or array of booleans
  quoteChar: '"',
  escapeChar: '"',
  delimiter: ',',
  header: true,
  newline: '\r\n',
  skipEmptyLines: false //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
}

export const CSV_PapaParse_Parse_Options = {
  delimiter: '', // auto-detect
  newline: '', // auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: true,
  transformHeader: undefined,
  dynamicTyping: false,
  preview: 0,
  encoding: '',
  worker: false,
  comments: false,
  step: undefined,
  complete: undefined,
  error: undefined,
  download: false,
  downloadRequestHeaders: undefined,
  downloadRequestBody: undefined,
  skipEmptyLines: false,
  chunk: undefined,
  chunkSize: undefined,
  fastMode: undefined,
  beforeFirstChunk: undefined,
  withCredentials: undefined,
  transform: undefined,
  delimitersToGuess: [
    ',',
    '\t',
    '|',
    ';',
    Papa.RECORD_SEP,
    Papa.UNIT_SEP
  ]
}
