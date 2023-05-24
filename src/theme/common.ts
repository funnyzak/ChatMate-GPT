/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Theme } from '@src/types'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
export const Layout = StyleSheet.create({
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  fill: {
    width: '100%',
    height: '100%'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  flexRowStart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  flexRowCenter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export const Card = {
  container: (theme: Theme): ViewStyle => ({
    ...Layout.fullWidth,
    paddingHorizontal:
      (theme.dimensions.WINDOW_WIDTH -
        theme.dimensions.layoutContainerWidth) /
      2
  })
}
export const View = {
  background: (theme: Theme): ViewStyle => ({
    backgroundColor: theme.colors.background
  })
}
export const Divider = {
  item: (theme: Theme): ViewStyle => ({
    height: 0.5,
    width: '100%',
    backgroundColor: theme.colors.borderBase,
    marginVertical: theme.spacing.medium
  })
}
export const Button = {
  textAction: (theme: Theme): TextStyle => ({
    ...theme.typography.labelText,
    marginTop: theme.spacing.medium,
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 5,
    maxWidth: 200,
    alignSelf: 'center',
    borderBottomColor: theme.colors.transparent,
    paddingHorizontal: theme.spacing.medium,
    color: theme.colors.secondary
  })
}
export const Header = {
  background: (
    theme: Theme,
    withBorder: boolean = false,
    borderWidth: number = 0.3
  ): ViewStyle => ({
    height: '100%',
    width: '100%',
    borderBottomColor: withBorder
      ? theme.colors.headerBorder
      : theme.colors.transparent,
    borderBottomWidth: borderWidth
  })
}
