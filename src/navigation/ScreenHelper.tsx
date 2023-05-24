/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-16.
 */

import React, { ReactNode } from 'react'
import { Platform, View } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { SylCommon, Theme } from '@src/theme'
import {
  CustomHeaderTitle,
  CustomHeaderTitleProps,
  HeaderButton,
  Svgs
} from '@src/screens/components'
import NavigationService from './NavigationService'
import { Avatar } from 'react-native-gifted-chat'
import { logInfo } from '@src/helper'
export const defaultCommonScreenOptions = (
  theme: Theme,
  options?: StackNavigationOptions
) => ({
  ...options,
  // hide header shadow
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: theme.colors.headerBackground
  },
  headerTintColor: theme.colors.appbarTint,
  // screen main content style
  contentStyle: {
    backgroundColor: theme.colors.background
  }
})
export const screenTransitionAnimation = (type: 'push' | 'pop') => {
  let _options: StackNavigationOptions = {
    animationEnabled: true,
    animationTypeForReplace: type,
    gestureEnabled: true,
    gestureDirection: 'horizontal'
  }
  if (Platform.OS === 'android') {
    _options = {
      ..._options,
      transitionSpec:
        type === 'push'
          ? {
              open: {
                animation: 'timing',
                config: { duration: 300 }
              },
              close: {
                animation: 'timing',
                config: { duration: 300 }
              }
            }
          : undefined,
      cardStyleInterpolator:
        type === 'push'
          ? ({ current, layouts }) => {
              logInfo('cardStyleInterpolator', current, layouts)
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0]
                      })
                    }
                  ]
                }
              }
            }
          : undefined
    }
  }
  return _options
}
export const defaultScreenOptions = (
  theme: Theme,
  options?: StackNavigationOptions
): StackNavigationOptions => ({
  ...defaultCommonScreenOptions(theme),
  ...options,
  ...screenTransitionAnimation('push'),
  // headerTitleStyle: {
  //   fontWeight: 'bold',
  //   fontSize: theme.typography.titleText.fontSize,
  //   minWidth: 240,
  //   maxWidth: '80%',
  //   marginHorizontal: 'auto',
  //   textAlign: 'center'
  // },
  headerTitleAlign: 'center',
  headerTitle: (props: CustomHeaderTitleProps) => (
    <CustomHeaderTitle {...props} />
  ),
  headerBackTitle: undefined,
  headerBackTitleVisible: false,
  headerBackImage: () => (
    <HeaderButton
      direction="left"
      iconNode={<Svgs.headers.Back theme={theme} />}
      onPress={() => {
        NavigationService.goBack()
      }}
    />
  ),
  headerBackground: (): ReactNode => (
    <View style={SylCommon.Header.background(theme)} />
  )
})
