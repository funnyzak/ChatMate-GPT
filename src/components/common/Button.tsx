/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Theme, useTheme } from '@src/theme'
import React from 'react'
import {
  ActivityIndicator,
  TouchableOpacityProps as NativeTouchableOpacityProps,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import { Text } from './Text'
export interface TouchableOpacityProps
  extends NativeTouchableOpacityProps {
  loading?: boolean
  disabled?: boolean
  textColor?: string
  textStyle?: StyleProp<TextStyle>
  type?: 'large' | 'small'
}
const Button = ({
  onPress,
  children,
  style,
  onLongPress,
  textColor,
  loading = false,
  disabled = false,
  textStyle: textSytle,
  type = 'large'
}: TouchableOpacityProps) => {
  const { theme } = useTheme()
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress}
      style={[styles.buttonStyle(theme, type, disabled), style]}
      activeOpacity={0.7}
      disabled={disabled}>
      {loading && (
        <ActivityIndicator
          size={'small'}
          color={
            styles.buttonTitle(theme, type, disabled, textColor).color
          }
          style={{ marginRight: theme.spacing.small }}
        />
      )}
      <Text
        style={[
          styles.buttonTitle(theme, type, disabled, textColor),
          textSytle
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}
const styles = {
  buttonStyle: (
    _theme: Theme,
    type: 'large' | 'small',
    disabled: boolean
  ): ViewStyle => {
    return {
      borderWidth: _theme.dimensions.defaultLineWidth,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: disabled
        ? _theme.colors.disabled
        : _theme.colors.primaryLight,
      backgroundColor: disabled
        ? _theme.colors.disabled
        : _theme.colors.primary,
      ...(type === 'large'
        ? {
            borderRadius: _theme.dimensions.defaultButtonRadius,
            width: _theme.dimensions.defaultButtonWidth,
            height: _theme.dimensions.defaultButtonHeight,
            display: 'flex',
            flexDirection: 'row'
          }
        : {
            borderRadius: _theme.dimensions.defaultButtonRadius / 1.2,
            paddingHorizontal: 8,
            paddingVertical: 0,
            height: 24
          })
    }
  },
  buttonTitle: (
    _theme: Theme,
    type: 'large' | 'small',
    disabled: boolean,
    textColor?: string
  ): TextStyle => ({
    ...(type === 'large'
      ? {
          ..._theme.typography.subheadingText
        }
      : {
          ..._theme.typography.labelText
        }),
    color:
      textColor ??
      (disabled
        ? _theme.colors.onDisabled
        : _theme.colors.onSecondary),
    alignSelf: 'center'
  })
}
export { Button }
