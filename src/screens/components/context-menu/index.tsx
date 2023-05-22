/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-04.
 */

import { ChatConversation } from '@src/types'

export * from './ChatContextMenu'
export * from './MessageContextMenu'
export * from './ChatContextMenu2'
export * from './MessageContextMenu2'

import React from 'react'
import { Platform, StyleProp, ViewStyle } from 'react-native'
import { ChatContextMenu } from './ChatContextMenu'
import { ChatContextMenu2 } from './ChatContextMenu2'
import { MessageContextMenu } from './MessageContextMenu'
import { MessageContextMenu2 } from './MessageContextMenu2'
import { IMessage } from 'react-native-gifted-chat'

export const ChatCMenu = (props: {
  showTitle?: boolean
  children: React.ReactNode
  conversation: ChatConversation
}) => {
  return Platform.OS === 'ios' ? (
    <ChatContextMenu2 {...props} />
  ) : (
    <ChatContextMenu {...props} />
  )
}

export const MessageCMenu = (props: {
  message: IMessage
  conversation: ChatConversation
  containerStyle?: StyleProp<ViewStyle>
  children: React.ReactNode
}) => {
  return Platform.OS === 'ios' ? (
    <MessageContextMenu2 {...props} />
  ) : (
    <MessageContextMenu {...props} />
  )
}
