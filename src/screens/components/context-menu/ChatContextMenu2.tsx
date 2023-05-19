/**
 * Created by Leon<silenceace@gmail.com> at 2023-05-15.
 */

import { OpenAIModels } from '@src/helper'
import { useAppSelector, useChatActionMenu } from '@src/hooks'
import { translate } from '@src/i18n'
import { RootState } from '@src/store'
import { ChatConversation } from '@src/types'
import React, { useMemo } from 'react'
import { ContextMenuButton } from 'react-native-ios-context-menu'

const TemperatureArray = [0, 0.3, 0.7, 1].map((i) =>
  i.toFixed(1).toString().endsWith('0') ? i.toString() : i.toFixed(1)
)
const MaxMessagesArray = Array.from({ length: 7 }, (_, i) =>
  i.toString()
).concat(['30'])

export const ChatContextMenu2 = ({
  children,
  conversation,
  showTitle = true
}: {
  showTitle?: boolean
  children: React.ReactNode
  conversation: ChatConversation
}) => {
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
    <ContextMenuButton
      isMenuPrimaryAction={true}
      menuConfig={{
        menuTitle: showTitle ? conversation.title : '',
        menuItems: [
          {
            actionKey: 'rename',
            actionTitle: translate('common.title'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'square.and.pencil'
              }
            }
          },
          {
            actionKey: 'prompt',
            actionTitle: translate('contextmenu.prompt'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'wand.and.stars.inverse'
              }
            }
          },
          {
            menuTitle: translate('contextmenu.chatModel'),
            menuSubtitle: `${_model}`,
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'square.stack.3d.down.right'
              }
            },
            menuItems: [translate('common.default')]
              .concat(OpenAIModels)
              .map((model, idx) => ({
                actionKey: idx === 0 ? 'model' : `model,${model}`,
                actionTitle: model,
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName:
                      !conversation?.config?.model &&
                      model === translate('common.default')
                        ? 'checkmark'
                        : conversation?.config?.model === model
                        ? 'checkmark'
                        : ''
                  }
                }
              }))
          },
          {
            menuTitle: `${translate(
              'contextmenu.temperature'
            )}${translate('symbol.colon')} ${_template}`,
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'slider.horizontal.3'
              }
            },
            menuItems: [translate('common.default')]
              .concat(TemperatureArray)
              .map((i, idx) => {
                const temperature = conversation.config?.temperature
                return {
                  actionTitle: i.toString(),
                  actionKey:
                    idx === 0 ? 'temperature' : `temperature,${i}`,
                  icon: {
                    type: 'IMAGE_SYSTEM',
                    imageValue: {
                      systemName:
                        temperature === undefined &&
                        i === translate('common.default')
                          ? 'checkmark'
                          : temperature !== undefined &&
                            temperature!.toString() === i.toString()
                          ? 'checkmark'
                          : ''
                    }
                  }
                }
              })
          },
          {
            menuTitle: `${translate(
              'contextmenu.maxMessagesInContext'
            )}${translate('symbol.colon')} ${_maxMessage}`,
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'ellipses.bubble'
              }
            },
            menuItems: [translate('common.default')]
              .concat(MaxMessagesArray)
              .map((i, idx) => {
                const maxMessages =
                  conversation.perference?.maxMessagesInContext
                return {
                  actionTitle: i.toString(),
                  actionKey: idx === 0 ? 'messages' : `messages,${i}`,
                  icon: {
                    type: 'IMAGE_SYSTEM',
                    imageValue: {
                      systemName:
                        maxMessages === undefined &&
                        i === translate('common.default')
                          ? 'checkmark'
                          : maxMessages !== undefined &&
                            maxMessages.toString() === i
                          ? 'checkmark'
                          : ''
                    }
                  }
                }
              })
          },
          {
            menuTitle: '',
            menuOptions: ['displayInline'],
            menuItems: [
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
                actionKey: 'shortcut',
                actionTitle: translate('common.shortcut'),
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'bolt.horizontal.circle'
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
              },
              {
                actionKey: 'stat',
                actionTitle: translate('common.stat'),
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'chart.pie'
                  }
                }
              }
            ]
          },
          {
            menuTitle: ``,
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'delete',
                actionTitle: translate('common.delete'),
                menuAttributes: ['destructive'],
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'trash'
                  }
                }
              }
            ]
          }
        ]
      }}
      onPressMenuItem={({ nativeEvent }) => {
        const [action, val] = nativeEvent.actionKey.split(',')

        press({
          action: action as any,
          actionValue:
            ['temperature', 'messages'].includes(action) &&
            val !== undefined
              ? Number(val)
              : val
        })
      }}>
      {children}
    </ContextMenuButton>
  )
}
