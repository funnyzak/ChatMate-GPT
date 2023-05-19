/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerNavigationOptions,
  createDrawerNavigator,
  useDrawerStatus
} from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { useQuickAction } from '@src/helper'
import { translate } from '@src/i18n'
import { defaultScreenOptions as _defaultScreenOptions } from '@src/navigation'
import {
  ROUTES,
  ChatDrawerScreenProps as ScreenProps
} from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import { Theme } from '@src/types'
import React, { useEffect } from 'react'
import { Keyboard, View } from 'react-native'
import { connect } from 'react-redux'
import { HeaderButton, Svgs } from '../components'
import {
  ChatContextMenu,
  ChatContextMenu2
} from '../components/context-menu'
import { SettingSideBar } from '../components/sidebar'
import ChatScreen from './Chat'
import { SettingSideBarContainerStyle } from '../components/sidebar/SettingSideBar'
const defaultScreenOptions = (theme: Theme) => {
  return _defaultScreenOptions(theme, {
    headerBackground: () => (
      <View style={SylCommon.Header.background(theme)} />
    )
  })
}
const drawerContentWidth = 220
/**
 * Crate Drawer Navigator
 */
const ChatDrawerNavigator = createDrawerNavigator()
const ChatDrawerContent = (props: DrawerContentComponentProps) => {
  const isDrawerOpen = useDrawerStatus() === 'open'

  useEffect(() => {
    if (isDrawerOpen) {
      Keyboard.dismiss()
    }
  }, [isDrawerOpen])
  return (
    <DrawerContentScrollView scrollEnabled={false} {...props}>
      <SettingSideBar wrapperWidth={drawerContentWidth} />
    </DrawerContentScrollView>
  )
}
const ChatDrawer = ({
  navigation,
  chat,
  initialRouteName
}: ScreenProps & {
  initialRouteName: string
  setting: RootState['setting']
  chat: RootState['chat']
}) => {
  const { theme } = useTheme()
  const { showMsg } = useQuickAction()
  return (
    <ChatDrawerNavigator.Navigator
      initialRouteName={initialRouteName}
      drawerContent={(props) => <ChatDrawerContent {...props} />}
      screenOptions={{
        headerLeft: () => (
          <HeaderButton
            onPress={() => {
              if (chat.requesting) {
                showMsg({
                  type: 'warn',
                  text2: translate('tips.onRequestWait'),
                  visibilityTime: 2000
                })
                return
              }
              navigation.dispatch(DrawerActions.toggleDrawer())
            }}
            iconNode={<Svgs.headers.Chats theme={theme} />}
            direction="left"
          />
        ),
        headerRight: () =>
          chat.chat ? (
            <ChatContextMenu2
              conversation={chat.chat}
              showTitle={false}>
              <HeaderButton
                iconNode={<Svgs.headers.More theme={theme} />}
                direction="right"
              />
            </ChatContextMenu2>
          ) : null,
        drawerType: 'slide',
        drawerStyle: SettingSideBarContainerStyle(
          theme,
          drawerContentWidth
        )
      }}>
      <ChatDrawerNavigator.Screen
        key={ROUTES.Chat}
        name={ROUTES.Chat}
        component={ChatScreen}
        options={{
          ...(defaultScreenOptions(theme) as DrawerNavigationOptions),
          headerShown: true,
          title: translate(`router.${ROUTES.Chat}`)
        }}
      />
    </ChatDrawerNavigator.Navigator>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting, chat: state.chat }
}
export default connect(mapStateToProps)(ChatDrawer)
