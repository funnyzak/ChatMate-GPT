/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { useTheme } from '@src/theme'
import React from 'react'
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
type MenuButtonProps = {
  title: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  color?: ColorValue | undefined
}
function MenuButton({
  title,
  style,
  textStyle,
  color,
  onPress
}: MenuButtonProps) {
  const { theme } = useTheme()
  return (
    <TouchableOpacity
      accessible={true}
      style={[styles.container, style]}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text
        style={[
          styles.title,
          textStyle,
          { color: color ?? theme.colors.primaryText }
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    textAlign: 'center',
    width: '100%',
    padding: 15,
    paddingHorizontal: 8,
    display: 'flex',
    borderRadius: 10
  },
  title: {
    fontSize: 17,
    lineHeight: 18,
    textAlign: 'center',
    width: '100%',
    color: '#1A212E'
  }
})
export default MenuButton
