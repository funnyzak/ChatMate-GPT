/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import { HeaderTitleProps } from '@react-navigation/elements'
import { chatStat, useQuickAction } from '@src/helper'
import { useAppSelector, useGPTChat } from '@src/hooks'
import { translate } from '@src/i18n'
import {
  ROUTES,
  ChatScreenProps as ScreenProps
} from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import { fromNow } from '@src/utils/date'
import React, { ReactNode, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import {
  ChatConversationComponent,
  CustomHeaderTitle
} from '../components'
const Chat = ({
  route,
  navigation,
  setting
}: ScreenProps & {
  setting: RootState['setting']
  app: RootState['app']
  openAISetting: RootState['openAISetting']
}) => {
  const { theme } = useTheme()
  const { chatId = undefined } = route.params || {}
  const {
    chat: { chat: currentConversation }
  } = useAppSelector((state: RootState) => state)
  const { requesting } = useGPTChat(currentConversation)
  const { checkIsSetAPIKey } = useQuickAction()
  const stat = useMemo(
    () =>
      currentConversation?.messages
        ? chatStat(currentConversation)
        : undefined,
    [currentConversation?.messages]
  )
  const humanTime = useMemo(
    () =>
      currentConversation
        ? fromNow(
            (currentConversation?.updateAt ||
              currentConversation?.createAt) * 1000
          )
        : undefined,
    [currentConversation?.updateAt, currentConversation?.createAt]
  )
  const headerTitle = useMemo(
    () =>
      requesting
        ? translate('chat.typing')
        : currentConversation?.title ||
          translate(`router.${ROUTES.Chat}`),
    [requesting, currentConversation?.title]
  )

  useEffect(() => {
    checkIsSetAPIKey(true)
  }, [])
  useEffect(() => {
    let description = !stat
      ? humanTime
      : translate('chat.chatDescription')
          .replace('{messageCount}', stat.gptMessages.toString())
          .replace('{cost}', stat.cost.toString())

    navigation.setOptions({
      headerBackground: (): ReactNode => (
        <View style={SylCommon.Header.background(theme, true)} />
      ),
      headerTitle: (props: HeaderTitleProps) => (
        <CustomHeaderTitle
          {...props}
          children={headerTitle}
          descriptionText={description}
        />
      )
    })
  }, [humanTime, stat, setting.languageTag, theme, headerTitle])
  return <ChatConversationComponent chatId={chatId} />
}
const mapStateToProps = (state: RootState) => {
  return {
    setting: state.setting,
    app: state.app,
    openAISetting: state.openAISetting
  }
}
export default connect(mapStateToProps)(Chat)
