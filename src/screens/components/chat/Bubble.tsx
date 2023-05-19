/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-21.
 */

import {
  calcOpenAIApiTokenCost,
  logInfo,
  useQuickAction
} from '@src/helper'
import { useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import { ChatConversation, MessageTokenUsage } from '@src/types'
import React, { useCallback } from 'react'
import { Bubble, IMessage, Time } from 'react-native-gifted-chat'
import { ChatBubbleStyles } from './ChatStyles'
import { useChatMessageAction } from '@src/hooks/useChatMessageAction'
export const MessageBubble = (
  props: any & {
    conversation: ChatConversation
  }
) => {
  const { openAISetting, chatSetting } = useAppSelector(
    (state) => state
  )
  const { theme } = useTheme()
  const { featureTips } = useQuickAction()

  const { chatMessageMenuPress } = useChatMessageAction(
    props.currentMessage,
    props.conversation
  )
  const onBubblePress = useCallback(
    (context: any, currentMessage: IMessage) => {
      chatMessageMenuPress({
        action: chatSetting.messageBubbleBehavior
      })
    },
    [props.conversation, chatSetting]
  )

  const onBubbleLongPress = useCallback(
    (context: any, currentMessage: IMessage) => {
      logInfo('Bubble long pressed', currentMessage)
    },
    [props.conversation]
  )

  const tokenUsage =
    openAISetting.showEstimatedTokenCount &&
    props.currentMessage?._tokenUsage
      ? (props.currentMessage._tokenUsage as MessageTokenUsage)
      : undefined

  let tokenText =
    tokenUsage !== undefined
      ? `${translate('common.cost')}:${
          calcOpenAIApiTokenCost(
            tokenUsage,
            props.currentMessage?._model
          )?.total
        } ${translate('chat.tokens')}:${tokenUsage.total_tokens || 0}`
      : ''
  const characterText = openAISetting.showWordCount
    ? `${translate('chat.characters')}:${
        props.currentMessage.text.length
      }`
    : ''
  let tickText = [tokenText, characterText].join('  ').trim()

  // If the message is empty, we will show a blank message
  if (
    !props.currentMessage?.text ||
    props.currentMessage?.text.trim().length === 0
  ) {
    props.currentMessage!.text = translate('common.blank')
  }

  // logInfo('Render Bubble', 'Message', props.currentMessage.text)
  return (
    <Bubble
      {...props}
      tickStyle={ChatBubbleStyles.tick(
        theme,
        chatSetting.fontSizeRatio
      )}
      renderTime={(_props: any) => (
        <Time
          {..._props}
          timeTextStyle={ChatBubbleStyles.tick(
            theme,
            chatSetting.fontSizeRatio
          )}
        />
      )}
      wrapperStyle={ChatBubbleStyles.wrapper(
        theme,
        openAISetting.renderMd && props.position === 'left'
      )}
      containerStyle={ChatBubbleStyles.container(theme)}
      ticksText={tickText}
      onLongPress={onBubbleLongPress}
      onPress={onBubblePress}
    />
  )
}

// const BubbleTicks = (props: any) => {
//   return (
//     <Text>
//       {' '}
//       {translate('chat.tokens')}:{' '}
//       {gptTokenizerEncode(props.text).length}
//       {'  '}
//       {translate('chat.characters')}: {props.text.length}
//     </Text>
//   )
// }
