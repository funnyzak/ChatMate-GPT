/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-24.
 */

import { SideBarChatScreenProps as ScreenProps } from '@src/navigation/routes'
import {
  ChatConversationComponent,
  SettingSideBar
} from '@src/screens/components'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import { ChatConversation } from '@src/types'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { SettingSideBarContainerStyle } from '../components/sidebar/SettingSideBar'
import { useQuickAction } from '@src/helper'

const siderBarWidth = 220
const ChatDrawer = ({
  route
}: ScreenProps & {
  initialRouteName: string
  setting: RootState['setting']
  chat: RootState['chat']
}) => {
  const { theme } = useTheme()
  const [chatId, setChatId] = React.useState<string>()
  const { chatId: _chatId = undefined } = route.params || {}

  const { checkIsSetAPIKey } = useQuickAction()
  useEffect(() => {
    checkIsSetAPIKey(true)
  }, [])

  useEffect(() => {
    setChatId(_chatId)
  }, [_chatId])

  return (
    <View
      style={[
        SylCommon.Layout.fill,
        {
          flexDirection: 'row'
        }
      ]}>
      <View
        style={{
          width: siderBarWidth
        }}>
        <SettingSideBar
          wrapperWidth={siderBarWidth}
          containerStyle={[
            SettingSideBarContainerStyle(theme, siderBarWidth),
            {
              paddingTop: 30,
              paddingBottom: 20
            }
          ]}
          conversationPress={(_v: ChatConversation) => {
            setChatId(_v.id)
          }}
        />
      </View>
      <View
        style={{
          flex: 1
        }}>
        <ChatConversationComponent chatId={chatId} />
      </View>
    </View>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting, chat: state.chat }
}
export default connect(mapStateToProps)(ChatDrawer)
