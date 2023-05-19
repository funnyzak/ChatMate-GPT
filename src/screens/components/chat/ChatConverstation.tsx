/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-24.
 */

import { setCurrentConversation } from '@src/actions'
import { newChatConversation } from '@src/helper/chatHelper'
import { useAppDispatch, useAppSelector } from '@src/hooks'

import { RootState } from '@src/store'
import { SylCommon } from '@src/theme'
import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ChatCompontent } from './GPTChat'
import { sortConversations } from '@src/helper'

export const ChatConversationComponent = ({
  chatId
}: {
  chatId?: string
}) => {
  const {
    cache: { conversations },
    chatSetting
  } = useAppSelector((state: RootState) => state)

  const appDispatch = useAppDispatch()
  const {
    chat: { chat: currentConversation }
  } = useAppSelector((state: RootState) => state)

  const sortedConversions = useMemo(
    () =>
      conversations
        ? sortConversations(
            Object.values(conversations),
            chatSetting.conversationOrderBy
          )
        : [],
    [conversations, chatSetting.conversationOrderBy]
  )

  useEffect(() => {
    if (
      !currentConversation &&
      conversations &&
      Object.values(conversations).length > 0
    ) {
      appDispatch(setCurrentConversation(sortedConversions[0]) as any)
    }
  }, [currentConversation?.id])
  useEffect(() => {
    if (chatId) {
      setCurrentConversation(
        conversations && conversations[chatId]
          ? conversations[chatId]
          : newChatConversation()
      )(appDispatch)
    }
  }, [chatId])

  return (
    <View style={[SylCommon.Layout.fill, {}]}>
      {currentConversation && (
        <ChatCompontent conversation={currentConversation} />
      )}
    </View>
  )
}
