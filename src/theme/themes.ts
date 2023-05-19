/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Theme } from './types'
import light_colors from './grey/colors'
import light_spacing from './grey/spacing'
import light_dimens from './grey/dimens'
import light_typography from './grey/typography'
import light_assets from './grey/assets'
import dark_colors from './black/colors'
import dark_typography from './black/typography'
import lovely_colors from './lovely/colors'
import lovely_typography from './lovely/typography'
import moon_colors from './moon/colors'
import moon_typography from './moon/typography'
export const grey: Theme = {
  name: 'grey',
  isDark: false,
  statusBarStyle: 'dark-content',
  colors: light_colors,
  spacing: light_spacing,
  dimensions: light_dimens,
  typography: light_typography,
  assets: light_assets
}
export const lovely: Theme = {
  name: 'lovely',
  statusBarStyle: 'light-content',
  isDark: false,
  colors: lovely_colors,
  typography: lovely_typography,
  spacing: light_spacing,
  dimensions: light_dimens,
  assets: light_assets
}
export const black: Theme = {
  name: 'black',
  statusBarStyle: 'light-content',
  isDark: true,
  colors: dark_colors,
  typography: dark_typography,
  spacing: light_spacing,
  dimensions: light_dimens,
  assets: light_assets
}
export const moon: Theme = {
  name: 'moon',
  isDark: true,
  statusBarStyle: 'light-content',
  colors: moon_colors,
  typography: moon_typography,
  spacing: light_spacing,
  dimensions: light_dimens,
  assets: light_assets
}
export const auto = undefined
const themes = {
  auto,
  grey,
  lovely,
  black,
  moon
}

export const darkThemes = { black, moon }
export const lightThemes = { grey, lovely }

export type ThemeType = keyof typeof themes
export default themes
