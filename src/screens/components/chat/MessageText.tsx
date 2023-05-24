/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-20.
 */

import Markdown, {
  MarkdownIt
} from '@ronradtke/react-native-markdown-display'
import { ChatMessageStyles, ChatStylePosition } from './ChatStyles'
import { useTheme } from '@src/theme'
import { ChatConversation } from '@src/types'
import React, { useMemo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  IMessage,
  MessageText,
  MessageTextProps
} from 'react-native-gifted-chat'
import { MessageCMenu, MessageContextMenu2 } from '../context-menu'
import { useAppSelector } from '@src/hooks'
import { useQuickAction } from '@src/helper'
import { translate } from '@src/i18n'
import { Svgs, TextWithIconPress } from '../common'
import Icons from '../common/Icons'
export interface MarkdownMessageTextProps {
  text: string
}

export const MarkdownMessageText = (props: any) => {
  const { theme } = useTheme()
  const { chatSetting } = useAppSelector((state) => state)
  const { copyText } = useQuickAction()
  const rules = useMemo(
    () => ({
      fence: (node: any, children: any, parent: any, styles: any) => (
        <View
          style={{
            display: 'flex',
            borderRadius: theme.dimensions.borderRadius,
            overflow: 'hidden',
            flexDirection: 'column',
            marginVertical: theme.spacing.small,
            borderWidth: theme.dimensions.defaultLineWidth * 1.5,
            borderColor: theme.colors.borderDark
          }}
          key={node.key}>
          <View
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: theme.colors.borderDark,
              padding: theme.spacing.small,
              paddingVertical: 2
            }}>
            <Text
              style={{
                color: theme.colors.primaryText,
                fontSize: styles.fence.fontSize
              }}>
              {node.sourceInfo || ''}
            </Text>
            <TextWithIconPress
              text={translate('button.copyCode')}
              textStyle={{
                paddingLeft: theme.spacing.tiny,
                color: theme.colors.primaryText,
                fontSize: styles.fence.fontSize
              }}
              onPress={() => {
                copyText(node.content, translate('tips.copyCode'))
              }}
              svgIcon={
                <Icons.common
                  theme={theme}
                  name="copy"
                  style={{
                    color: theme.colors.primaryText,
                    fontSize: styles.fence.fontSize
                  }}
                />
              }
            />
          </View>
          <Text
            style={[
              styles.text,
              styles.fence,
              {
                paddingBottom: 0
              }
            ]}>
            {node.content || ''}
          </Text>
        </View>
      )
    }),
    [theme]
  )

  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.small
      }}>
      <Markdown
        markdownit={MarkdownIt({
          typographer: true
        }).disable(['image', 'hr', 'list'])}
        rules={rules}
        style={ChatMessageStyles.markdownText(
          theme,
          chatSetting.fontSizeRatio
        )}>
        {props.currentMessage!.text}
      </Markdown>
    </View>
  )
}
export const SimpleMessageText = (
  props: MessageTextProps<IMessage>
) => {
  const { chatSetting } = useAppSelector((state) => state)
  const { theme } = useTheme()

  return (
    <MessageText
      {...props}
      textStyle={ChatMessageStyles.text(
        theme,
        chatSetting.fontSizeRatio
      )}
    />
  )
}

export const RichMessageText = (
  props: MessageTextProps<IMessage> & {
    renderMD?: boolean
    conversation: ChatConversation
  }
) => (
  <MessageCMenu
    message={props!.currentMessage!}
    conversation={props.conversation}>
    {props.renderMD && props.position === 'left' ? (
      <MarkdownMessageText {...props} />
    ) : (
      <SimpleMessageText {...props} />
    )}
  </MessageCMenu>
)
