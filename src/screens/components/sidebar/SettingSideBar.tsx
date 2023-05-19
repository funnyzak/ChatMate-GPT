/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-27.
 */

import { setTheme } from '@src/actions'
import { Avatar } from '@src/components'
import { sortConversations } from '@src/helper'
import { useAppSelector } from '@src/hooks'
import { useSettingAction } from '@src/hooks/useSettingAction'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import {
  Conversations,
  Svgs,
  TextWithIconPress
} from '@src/screens/components'
import { RootState } from '@src/store'
import { SylCommon, Theme, useTheme } from '@src/theme'
import { ChatConversation } from '@src/types'
import React, { useMemo } from 'react'
import {
  Alert,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
interface SettingDrawerProps {
  containerStyle?: StyleProp<ViewStyle>
  conversationPress?: (chatConversation: ChatConversation) => void
  wrapperWidth: number
}
const SettingBarComponent = ({
  wrapperWidth,
  conversationPress,
  containerStyle
}: SettingDrawerProps) => {
  const { theme, resetTheme } = useTheme()
  const { setting, cache, chatSetting } = useAppSelector(
    (state: RootState) => state
  )
  const dispatch = useDispatch()
  const { shareApp, resetConversations } = useSettingAction()
  const insets = useSafeAreaInsets()

  const conversions = useMemo(
    () =>
      cache.conversations
        ? sortConversations(
            Object.values(cache.conversations),
            chatSetting.conversationOrderBy
          )
        : [],
    [cache.conversations, chatSetting.conversationOrderBy]
  )

  const AvatarImg = useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          NavigationService.navigate(ROUTES.EditChatTitle, {
            type: 'avatar'
          })
        }}>
        {chatSetting.avatarImgUrl ? (
          <Avatar
            source={{ uri: chatSetting.avatarImgUrl }}
            size={60}
          />
        ) : (
          <Svgs.ChatMate size={60} theme={theme} />
        )}
      </TouchableOpacity>
    ),
    [chatSetting.avatarImgUrl, theme]
  )

  return (
    <View
      style={[
        styles.container(theme),
        {
          width: wrapperWidth
        },
        containerStyle
      ]}>
      <View
        style={{
          ...SylCommon.Layout.flexRowCenter,
          marginTop: 10
        }}>
        {AvatarImg}
      </View>
      <Conversations
        conversations={conversions}
        onRowPress={conversationPress}
        containerStyle={{
          width: wrapperWidth - theme.spacing.tiny * 4,
          marginTop: theme.spacing.extraLarge,
          height:
            theme.dimensions.WINDOW_HEIGHT -
            60 -
            215 -
            (insets.bottom === 0 ? 20 : 0) -
            insets.top -
            insets.bottom,
          paddingBottom: theme.spacing.large,
          borderBottomWidth: theme.dimensions.defaultLineWidth,
          borderBottomColor: theme.colors.borderDark
        }}
        itemContainerStyle={[
          {
            width: wrapperWidth - theme.spacing.tiny * 3
          }
        ]}
      />
      {[
        {
          svgIcon: (
            <Svgs.drawer.common name={'trash'} theme={theme} />
          ),
          text: translate('drawer.clearConversation')
        },
        {
          svgIcon: theme.isDark ? (
            <Svgs.drawer.LightMode theme={theme} />
          ) : (
            <Svgs.drawer.common name={'moon'} theme={theme} />
          ),
          text: theme.isDark
            ? translate('drawer.lightMode')
            : translate('drawer.nightMode')
        },
        {
          svgIcon: (
            <Svgs.drawer.common name={'settings'} theme={theme} />
          ),
          text: translate('drawer.setting')
        },
        {
          svgIcon: (
            <Svgs.drawer.common name={'rocket'} theme={theme} />
          ),
          text: translate('drawer.appCenter')
        },
        {
          svgIcon: (
            <Svgs.drawer.common name={'share-social'} theme={theme} />
          ),
          text: translate('drawer.share')
        }
      ].map((_item, _idx) => (
        <TextWithIconPress
          key={_idx}
          svgIcon={_item.svgIcon}
          onPress={() => {
            switch (_idx) {
              case 0:
                resetConversations()
                break
              case 1:
                resetTheme(
                  theme.isDark
                    ? setting.themeLightMode
                    : setting.themeNightMode
                )
                dispatch(
                  setTheme(
                    theme.isDark
                      ? setting.themeLightMode
                      : setting.themeNightMode
                  )
                )
                break
              case 2:
                NavigationService.navigate(ROUTES.Setting)
                break
              case 3:
                NavigationService.navigate(ROUTES.Shortcut)
                break
              case 4:
                shareApp()
                break
            }
          }}
          containerStyle={[
            {
              marginTop: 8,
              paddingHorizontal: theme.spacing.small,
              height: 30
            }
          ]}
          iconSize={20}
          text={_item.text}
        />
      ))}
    </View>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  })
}
export default SettingBarComponent

export const SettingSideBarContainerStyle = (
  theme: Theme,
  width: number
) => ({
  backgroundColor: theme.colors.backgroundDark,
  borderRightColor: theme.colors.borderDark,
  borderRightWidth: theme.dimensions.defaultLineWidth,
  paddingLeft: theme.spacing.small,
  width: width
})
