/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import lightColors from '../grey/colors'
import { ColorPalette } from '../types'
const colors: ColorPalette = {
  ...lightColors,
  appbarTint: '#ffffff',
  appbarIcon: '#0b7df8',
  primary: '#0b7df8',
  primaryLight: '#54a4fa',
  primaryDark: '#ffffff',
  primaryText: '#ffffff',
  regularText: '#D9D9D9',
  secondaryText: '#eeeeee',
  background: '#121212',
  backgroundLight: '#484848',
  backgroundDark: '#000000',
  borderBase: '#696969',
  borderLight: '#373737',
  borderDark: '#3f3f3f',
  borderLighter: '#333336',
  disabled: '#646464',
  onDisabled: '#cccccc',

  secondary: '#7B61FF',
  headerBackground: '#121212',
  inputBackground: '#222222',
  headerBorder: '#222222',
  surface: '#222222',
  captionText: '#8D8D8D',
  placeholderText: '#8D8D8D',
  overlay: '#383838',
  chat: {
    loadEarlier: {
      wrapperBackground: '#4e4e4e'
    },
    bubble: {
      leftWrapperBackground: '#292929',
      rightWrapperBackground: '#0b7df8',
      leftText: '#e7e7e7',
      leftTick: '#b8b8b8',
      rightText: '#ffffff',
      rightTick: '#ffffff',
      userName: '#0b7df8'
    }
  }
}
export default colors
