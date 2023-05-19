/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { useTheme } from '@src/theme'
import { Theme } from '@src/types'
import React from 'react'
import {
  TextInputProps as NativeTextInputProps,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { Text } from './Text'
export interface TextInputProps extends NativeTextInputProps {
  label?: string
  assignRef?: (ref: TextInput) => void
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<ViewStyle>
}
const Input = ({
  label,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  assignRef = () => {},
  containerStyle,
  labelStyle,
  inputStyle,
  ...props
}: TextInputProps) => {
  const { theme } = useTheme()
  return (
    <View style={[styles.containerStyle(theme), containerStyle]}>
      {label && (
        <Text
          type="heading"
          style={[styles.labelStyle(theme), labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        autoCorrect={false}
        keyboardAppearance={theme.isDark ? 'dark' : 'light'}
        {...props}
        style={[styles.inputStyle(theme), inputStyle]}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholderText}
        onChangeText={onChangeText}
        ref={(component: TextInput) => {
          assignRef && assignRef(component)
        }}
      />
    </View>
  )
}
const styles = {
  containerStyle: (_theme: Theme): ViewStyle => ({
    display: 'flex',
    height: _theme.dimensions.defaultInputBoxHeight,
    backgroundColor: _theme.colors.surface,
    borderWidth: _theme.dimensions.defaultLineWidth,
    borderRadius: _theme.dimensions.borderRadius * 2,
    borderColor: _theme.colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: _theme.spacing.medium
  }),
  inputStyle: (_theme: Theme): TextStyle => ({
    ..._theme.typography.inputText,
    flex: 1,
    color: _theme.colors.regularText
  }),
  labelStyle: (_theme: Theme): ViewStyle => ({
    paddingHorizontal: _theme.spacing.large
  })
}
export { Input }
