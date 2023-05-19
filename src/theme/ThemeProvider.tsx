/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import React, { useState, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import ThemeContext from './ThemeContext'
import themes, { ThemeType } from './themes'
import { store } from '@src/store'
import { useAppSelector } from '@src/hooks'
type Props = {
  children?: JSX.Element
}
const ThemeProvider = ({ children }: Props) => {
  const { setting } = useAppSelector((state) => state)
  const [themeName, resetTheme] = useState<ThemeType>(setting.theme)
  const colorScheme = useColorScheme()
  const theme = useMemo(
    () =>
      themeName === 'auto'
        ? themes[
            colorScheme === 'dark'
              ? store.getState().setting.themeNightMode
              : store.getState().setting.themeLightMode
          ]
        : themes[themeName],
    [
      themeName,
      colorScheme,
      setting.themeLightMode,
      setting.themeNightMode
    ]
  )
  return (
    <ThemeContext.Provider
      value={{ theme: theme!, themeName, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
