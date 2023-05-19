/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from '@src/theme'
import { useCallback } from 'react'
import { Platform, StatusBar } from 'react-native'
// set statusbar if the screen is currently focused.
// https://reactnavigation.org/docs/use-focus-effect/
export const SNStatusBar = ({
  backgroundColor
}: {
  backgroundColor?: string
}) => {
  const { theme } = useTheme()
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(
          backgroundColor ?? theme.colors.headerBackground
        )
      }
      StatusBar.setBarStyle(theme.statusBarStyle)
      return () => null
    }, [backgroundColor, theme])
  )
  return null
}
export default SNStatusBar
