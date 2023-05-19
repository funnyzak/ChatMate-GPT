/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import balckColors from '../black/colors'
import { ColorPalette } from '../types'
const colors: ColorPalette = {
  ...balckColors,
  appbarTint: '#ffffff',
  appbarIcon: '#D4AF37',
  primary: '#D4AF37',
  primaryLight: '#dcbf5e',
  secondary: '#7a6b88',
  secondaryLight: '#6c5b7b',
  primaryDark: '#ffffff',
  primaryText: '#ffffff',
  regularText: '#D9D9D9',
  secondaryText: '#eeeeee',
  background: '#1E1E1E',
  backgroundLight: '#484848',
  backgroundDark: '#1A1A1A',
  borderBase: '#535353',
  borderLight: '#3E3D3D',
  borderDark: '#3f3f3f',
  borderLighter: '#434343',
  disabled: '#646464',
  onDisabled: '#cccccc',

  headerBackground: '#1E1E1E',
  inputBackground: '#343434',
  headerBorder: '#343434',
  surface: '#343434',
  captionText: '#8D8D8D',
  placeholderText: '#8D8D8D',
  overlay: '#383838',
  chat: {
    ...balckColors.chat,
    loadEarlier: {
      wrapperBackground: '#4e4e4e'
    },
    bubble: {
      leftWrapperBackground: '#2e2e2e',
      rightWrapperBackground: '#D4AF37',
      leftText: '#e7e7e7',
      leftTick: '#b8b8b8',
      rightText: '#ffffff',
      rightTick: '#ffffff',
      userName: '#0b7df8'
    }
  }
}
export default colors
