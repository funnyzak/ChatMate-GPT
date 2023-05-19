/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-20.
 */

import { CHAT_MESSAGE_ACTION_MENU_TYPE } from '@src/helper/chatHelper'
import { logInfo } from '@src/helper/logger'
import { useChatMessageAction } from '@src/hooks/useChatMessageAction'
import { translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import { ChatConversation } from '@src/types'
import React from 'react'
import ContextMenu from 'react-native-context-menu-view'
import { IMessage } from 'react-native-gifted-chat'
import { StyleProp, ViewStyle } from 'react-native/types'
const parseContextMenuAction = (
  indexPath: number[]
): CHAT_MESSAGE_ACTION_MENU_TYPE => {
  const [parent, child] = indexPath
  switch (parent) {
    case 0:
      return 'speech'
    case 1:
      return 'copy'
    default:
      return 'share'
  }
}
export const MessageContextMenu = ({
  children,
  conversation,
  containerStyle,
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
    <ContextMenu
      style={containerStyle}
      title={translate('common.quickAction')}
      previewBackgroundColor={theme.colors.transparent}
      dropdownMenuMode={false}
      actions={[
        {
          title: translate('common.speech'),
          systemIcon: 'play'
        },
        {
          title: translate('common.copy'),
          systemIcon: 'doc.on.doc'
        },
        // {
        //   title: translate('common.stat'),
        //   systemIcon: 'chart.pie'
        // },
        {
          title: translate('common.share'),
          systemIcon: 'square.and.arrow.up',
          inlineChildren: true
        }
      ]}
      onPress={(_e) => {
        logInfo('chat context menu', _e.nativeEvent)
        chatMessageMenuPress({
          action: parseContextMenuAction(_e.nativeEvent.indexPath)
        })
      }}>
      {children}
    </ContextMenu>
  )
}
