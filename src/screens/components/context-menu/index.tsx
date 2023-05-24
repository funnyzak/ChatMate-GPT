/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-04.
 */

import { ChatConversation } from '@src/types'

export * from './ChatContextMenu'
export * from './MessageContextMenu'
export * from './ChatContextMenu2'
export * from './MessageContextMenu2'

import React from 'react'
import {
  Platform,
  StyleProp,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import { ChatContextMenu } from './ChatContextMenu'
import { ChatContextMenu2 } from './ChatContextMenu2'
import { MessageContextMenu } from './MessageContextMenu'
import { MessageContextMenu2 } from './MessageContextMenu2'
import { IMessage } from 'react-native-gifted-chat'
import { SheetManager } from 'react-native-actions-sheet'
import { ChatMenuOptions, ChatMessageOptions } from '../setting'

export const ChatCMenu = (props: {
  showTitle?: boolean
  children: React.ReactNode
  conversation: ChatConversation
}) => {
  return Platform.OS === 'ios' ? (
    <ChatContextMenu2 {...props} />
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        showChatMenuOptions({ conversation: props.conversation })
      }}>
      {props.children}
    </TouchableOpacity>
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
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        showMessageMenuOptions({
          conversation: props.conversation,
          message: props.message
        })
      }}>
      {props.children}
    </TouchableOpacity>
  )
}

export const showChatMenuOptions = (props: {
  conversation: ChatConversation
}) => {
  SheetManager.show('node-sheet', {
    onClose: (data: any) => {},
    payload: {
      title: props.conversation.title,
      children: <ChatMenuOptions conversation={props.conversation} />
    }
  })
}

export const showMessageMenuOptions = (props: {
  message: IMessage
  conversation: ChatConversation
}) => {
  SheetManager.show('node-sheet', {
    onClose: (data: any) => {},
    payload: {
      title: props.conversation.title,
      children: (
        <ChatMessageOptions
          conversation={props.conversation}
          message={props.message}
        />
      )
    }
  })
}
