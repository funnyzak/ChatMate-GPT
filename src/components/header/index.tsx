/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { StatusBar, View, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@src/theme'
import { Theme } from '@src/types'
import { Logo } from '../atoms'
const Header = ({
  headerRight
}: {
  headerRight: React.ReactNode
}) => {
  const { theme } = useTheme()
  return (
    <View style={styles.header(theme)}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      <Logo width={42 * 1.5} height={24 * 1.5} />
      <View style={styles.headerRight()}>{headerRight}</View>
    </View>
  )
}
export default Header
const styles = {
  header: (theme: Theme) => ({
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8
  }),
  headerRight: (): ViewStyle => ({
    position: 'absolute',
    right: 16,
    top: 4
  })
}
