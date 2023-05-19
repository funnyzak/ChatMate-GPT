/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-20.
 */

import { CHAT_MESSAGE_ACTION_MENU_TYPE } from '@src/helper'
import { useChatMessageAction } from '@src/hooks/useChatMessageAction'
import { translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import { ChatConversation } from '@src/types'
import React from 'react'
import { IMessage } from 'react-native-gifted-chat'
import { ContextMenuView } from 'react-native-ios-context-menu'
import { StyleProp, ViewStyle } from 'react-native/types'

export const MessageContextMenu2 = ({
  children,
  conversation,
  message
}: {
  message: IMessage
  conversation: ChatConversation
  containerStyle?: StyleProp<ViewStyle>
  children: React.ReactNode
}) => {
  const { theme } = useTheme()
  const { chatMessageMenuPress } = useChatMessageAction(
    message,
    conversation
  )
  return (
    <ContextMenuView
      menuConfig={{
        menuTitle: translate('common.quickAction'),
        menuItems: [
          {
            actionKey: 'speech',
            actionTitle: translate('common.speech'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'play'
              }
            }
          },
          {
            actionKey: 'copy',
            actionTitle: translate('common.copy'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'doc.on.doc'
              }
            }
          },
          {
            actionKey: 'share',
            actionTitle: translate('common.share'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'square.and.arrow.up'
              }
            }
          }
        ]
      }}
      onPressMenuItem={({ nativeEvent }) => {
        chatMessageMenuPress({
          action:
            nativeEvent.actionKey as CHAT_MESSAGE_ACTION_MENU_TYPE
        })
      }}>
      {children}
    </ContextMenuView>
  )
}
