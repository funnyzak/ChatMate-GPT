/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-20.
 */

import {
  CHAT_MESSAGE_ACTION_MENU_TYPE,
  replacePrompt,
  useQuickAction
} from '@src/helper'
import { translate } from '@src/i18n'
import { ChatConversation, ChatMessage } from '@src/types'
import { useCallback, useMemo } from 'react'
import { IMessage } from 'react-native-gifted-chat'
export const useChatMessageAction = (
  message: IMessage,
  conversation: ChatConversation
) => {
  const { copyText, share, speech } = useQuickAction()
  const chatMessage = useMemo(
    () =>
      (conversation &&
        conversation.messages &&
        conversation.messages.find(
          (_v: ChatMessage) => _v.id === message._id
        )) ||
      undefined,
    [conversation, message]
  )
  const messageText = useMemo(
    () =>
      !chatMessage
        ? message.text
        : chatMessage.message.role === 'assistant'
        ? chatMessage.message.content
        : replacePrompt(
            chatMessage.prompt,
            chatMessage.message.content
          ),
    [message, chatMessage]
  )
  const shareMessage = useCallback(() => {
    share({
      title: translate('brand.name'),
      message: messageText
    })
  }, [messageText])
  const copyMessage = useCallback(() => {
    copyText(messageText || '')
  }, [messageText])
  const chatMessageMenuPress = useCallback(
    ({
      action
    }: {
      action: CHAT_MESSAGE_ACTION_MENU_TYPE
      actionValue?: string | number
    }) => {
      if (!message) return
      switch (action) {
        case 'speech':
          speech(message.text)
          break
        case 'copy':
          copyText(message.text)
          break
        case 'share':
          shareMessage()
          break
      }
    },
    [message]
  )
  return {
    chatMessageMenuPress,
    shareMessage,
    copyMessage
  }
}
