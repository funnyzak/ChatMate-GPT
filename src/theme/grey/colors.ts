/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import { ColorPalette } from '../types'
const colors: ColorPalette = {
  AppLight: '#ffffff',
  AppDark: '#0e1b35',
  /**
   * ========================= Primary color : (Brand color) =========================
   */
  primaryDark: '#0757ad',
  primary: '#0b7df8',
  primaryLight: '#54a4fa',
  appbarTint: '#000000',
  appbarIcon: '#0b7df8',
  onPrimary: '#ffffff',
  /**
   * ========================= Secondary color =========================
   * secondaryLight: to be used for hover state
   * secondary: to be used as default button, checkbox, spinner, radio button and other component color
   * secondaryDark: to be used for active state
   */
  secondaryLight: '#9580ff',
  secondary: '#7b61ff',
  secondaryDark: '#6F2EF8',
  onSecondary: '#ffffff',
  /**
   * ========================= Tertiary color =========================
   * tertiaryLight: to be used for hover state
   * tertiary: to be used as default button, checkbox, spinner, radio button and other component color
   * tertiaryDark: to be used for active state
   */
  tertiaryLight: '#65AD42',
  tertiary: '#65AD42',
  tertiaryDark: '#429E16',
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older AndroiddisabledDark devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'transparent',
  /**
   * The screen background.
   */
  background: '#f5f5f5',
  headerBackground: '#F5F5F5',
  headerBorder: '#dcdcdc',
  inputBackground: '#FFFFFF',
  backgroundDark: '#E3E3E3',
  backgroundDarker: '#D8D8D8',
  backgroundLight: '#FFFFFF',
  /**
   * To be used as a default background for all components, like Card, CardSection, List etc
   */
  surface: '#FFFFFF',
  primaryText: '#101d51',
  regularText: '#3f4662',
  secondaryText: '#818284',
  placeholderText: '#bfbfbf',
  captionText: '#ababab',
  borderBase: '#DCDFE6',
  borderDark: '#bfbfbf',
  borderLight: '#e4e7ed',
  borderLighter: '#ebeef5',
  borderExtraLight: '#f2f6fc',
  overlay: '#0E1B35',
  /**
   * disabled: To be used for disabled component background
   * disabledDark: To be used for disabled component border and text color
   */
  disabled: '#e6e6e6',
  // light disabled color
  disabledDark: '#888888',
  onDisabled: '#888888',
  /**
   * Success messages and icons.
   */
  success: '#589d00',
  /**
   * Danger messages and icons.
   */
  danger: '#ef0064',
  /**
   * Warning messages and icons.
   */
  warning: '#ffbd5f',
  /**
   * Info messages and icons.
   */
  info: '#4F4D4D',
  dark: '#000000',
  white: '#ffffff',

  chat: {
    loadEarlier: {
      wrapperBackground: '#ababab'
    },
    bubble: {
      leftWrapperBackground: '#efeeee',
      rightWrapperBackground: '#0b7df8',
      leftText: '#101d51',
      leftTick: '#676f91',
      rightText: '#ffffff',
      rightTick: '#ffffff',
      userName: '#0b7df8'
    }
  }
}
export default colors
