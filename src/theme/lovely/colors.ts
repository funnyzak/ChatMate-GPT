/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import lightColors from '../grey/colors'
import { ColorPalette } from '../types'
const colors: ColorPalette = {
  ...lightColors,
  appbarTint: '#ffffff',
  appbarIcon: '#ffffff',
  primary: '#DD8A4B',
  primaryLight: '#de8b4c',
  primaryDark: '#ffffff',
  primaryText: '#f2f2f2',
  regularText: '#f5f5f5',
  secondaryText: '#f9f9f9',
  secondary: '#89dbf9',
  secondaryLight: '#6cd3f8',
  background: '#e15272',
  backgroundLight: '#ca4966',
  backgroundDark: '#cd5973',

  borderBase: '#F07591',
  borderDark: '#D86781',
  borderLight: '#D65572',
  borderLighter: '#e46380',
  borderExtraLight: '#e46380',

  disabled: '#CFAFB6',
  // light disabled color
  disabledDark: '#888888',
  onDisabled: '#f9f9f9',

  headerBackground: '#e15272',
  inputBackground: '#e46380',
  headerBorder: '#E8607E',
  surface: '#ca4966',
  captionText: '#f8d8df',
  placeholderText: '#f8d8df',
  overlay: '#f8d8df',
  chat: {
    loadEarlier: {
      wrapperBackground: '#E8607E'
    },
    bubble: {
      leftWrapperBackground: '#efeeee',
      rightWrapperBackground: '#de8b4c',
      leftText: '#101d51',
      leftTick: '#576085',
      rightText: '#ffffff',
      rightTick: '#ffffff',
      userName: '#0b7df8'
    }
  }
}
export default colors
