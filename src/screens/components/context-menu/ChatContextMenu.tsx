/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-04.
 */

import { OpenAIModels } from '@src/helper'
import { CHAT_ACTION_MENU_TYPE } from '@src/helper/chatHelper'
import { logInfo } from '@src/helper/logger'
import { useAppSelector } from '@src/hooks'
import { useChatActionMenu } from '@src/hooks/useChatAction'
import { translate } from '@src/i18n'
import { RootState } from '@src/store'
import { useTheme } from '@src/theme'
import { ChatConversation } from '@src/types'
import { alert } from '@src/utils/alert'
import React, { useMemo } from 'react'
import { Platform } from 'react-native'
import ContextMenu from 'react-native-context-menu-view'
const parseContextMenuAction = (
  indexPath: number[]
): CHAT_ACTION_MENU_TYPE => {
  const [parent, child] = indexPath
  switch (parent) {
    case 0:
      return 'rename'
    case 1:
      return 'prompt'
    case 2:
      return 'model'
    case 3:
      return 'temperature'
    case 4:
      return 'messages'
    case 5:
      return 'copy'
    case 6:
      return 'shortcut'
    case 7:
      return 'share'
    case 8:
      return 'stat'
    default:
      return 'delete'
  }
}
const TemperatureArray = [0, 0.3, 0.7, 1].map((i) =>
  i.toFixed(1).toString().endsWith('0') ? i.toString() : i.toFixed(1)
)
const MaxMessagesArray = Array.from({ length: 7 }, (_, i) =>
  i.toString()
).concat(['30'])
const parseContextMenuSubActionValue = (indexPath: number[]) => {
  const action = parseContextMenuAction(indexPath)
  const [, child] = indexPath
  if (action === 'temperature') {
    return child === 0
      ? undefined
      : Math.round(parseFloat(TemperatureArray[child - 1]) * 10) / 10
  } else if (action === 'messages') {
    return child > 7 ? 30 : child === 0 ? undefined : child - 1
  } else if (action === 'model') {
    return child === 0 ? undefined : OpenAIModels[child - 1]
  }
  return child
}
export const ChatContextMenu = ({
  children,
  conversation
}: {
  children: React.ReactNode
  conversation: ChatConversation
}) => {
  const { theme } = useTheme()
  const { chatMenuPress: press } = useChatActionMenu(conversation)
  const { openAISetting } = useAppSelector(
    (state: RootState) => state
  )
  const _template = useMemo(
    () =>
      conversation.config?.temperature === undefined
        ? openAISetting.temperature
        : conversation.config?.temperature,
    [conversation.config?.temperature, openAISetting.temperature]
  )

  const _maxMessage = useMemo(
    () =>
      conversation.perference?.maxMessagesInContext === undefined
        ? openAISetting.maxMessagesInContext
        : conversation.perference?.maxMessagesInContext,
    [
      conversation.perference?.maxMessagesInContext,
      openAISetting.maxMessagesInContext
    ]
  )

  const _model = useMemo(
    () =>
      conversation.config?.model === undefined
        ? openAISetting.model
        : conversation.config?.model,
    [conversation.config?.model, openAISetting.model]
  )

  return (
    <ContextMenu
      dropdownMenuMode={true}
      previewBackgroundColor={theme.colors.transparent}
      actions={[
        {
          title: translate('common.title'),
          systemIcon: 'square.and.pencil'
        },
        {
          title: translate('contextmenu.prompt'),
          systemIcon: 'wand.and.stars.inverse',
          inlineChildren: true
        },
        {
          title: `${translate('contextmenu.chatModel')}`,
          subtitle: `${_model}`,
          systemIcon: 'square.stack.3d.down.right',
          inlineChildren: false,
          actions: [translate('common.default')]
            .concat(OpenAIModels)
            .map((model) => ({
              title: model,
              systemIcon:
                !conversation?.config?.model &&
                model === translate('common.default')
                  ? 'checkmark'
                  : conversation?.config?.model === model
                  ? 'checkmark'
                  : ''
            }))
        },
        {
          title: `${translate('contextmenu.temperature')}${translate(
            'symbol.colon'
          )} ${_template}`,
          // subtitle: `${translate('common.current')}${translate(
          //   'symbol.colon'
          // )} ${_template}`,
          systemIcon: 'slider.horizontal.3',
          actions: [translate('common.default')]
            .concat(TemperatureArray)
            .map((i) => {
              const temperature = conversation.config?.temperature
              return {
                title: i.toString(),
                systemIcon:
                  temperature === undefined &&
                  i === translate('common.default')
                    ? 'checkmark'
                    : temperature !== undefined &&
                      temperature!.toString() === i.toString()
                    ? 'checkmark'
                    : ''
              }
            })
        },
        {
          title: `${translate(
            'contextmenu.maxMessagesInContext'
          )}${translate('symbol.colon')} ${_maxMessage}`,
          // subtitle: `${translate('common.current')}${translate(
          //   'symbol.colon'
          // )} ${_maxMessage}`,
          systemIcon: 'ellipses.bubble',
          actions: [translate('common.default')]
            .concat(MaxMessagesArray)
            .map((i) => {
              const maxMessages =
                conversation.perference?.maxMessagesInContext
              return {
                title: i.toString(),
                systemIcon:
                  maxMessages === undefined &&
                  i === translate('common.default')
                    ? 'checkmark'
                    : maxMessages !== undefined &&
                      maxMessages.toString() === i
                    ? 'checkmark'
                    : ''
              }
            })
        },
        {
          title: translate('common.copy'),
          systemIcon: 'doc.on.doc'
        },
        {
          title: translate('common.shortcut'),
          systemIcon: 'bolt.horizontal.circle'
        },
        {
          title: translate('common.share'),
          systemIcon: 'square.and.arrow.up'
        },
        {
          title: translate('common.stat'),
          systemIcon: 'chart.pie'
        },
        {
          title: translate('common.delete'),
          systemIcon: 'trash',
          destructive: true
        }
      ]}
      onPress={(_e) => {
        logInfo('chat context menu', _e.nativeEvent)
        const indexPath =
          Platform.OS === 'ios'
            ? _e.nativeEvent.indexPath
            : [_e.nativeEvent.index]

        press({
          action: parseContextMenuAction(indexPath),
          actionValue: parseContextMenuSubActionValue(indexPath)
        })
      }}>
      {children}
    </ContextMenu>
  )
}
