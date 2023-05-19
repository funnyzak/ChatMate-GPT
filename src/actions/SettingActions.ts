/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Dispatch } from 'redux'
import {
  APP_SETTING_LOCALES,
  APP_SETTING_THEME,
  APP_SETTING_PASTE_FROM_CLIPBOARD,
  APP_SETTING_THEME_LIGHT_MODE,
  APP_SETTING_THEME_DARK_MODE,
  APP_SETTING_ICLOUD_TIME,
  APP_SETTING_ICLOUD_SYNC,
  APP_SETTING_OPEN_LINK_IN_APP,
  APP_SETTING_HAPTIC_FEEDBACK,
  ThemeType,
  LanguageTagType
} from '../types'
import { changeLocale } from '@src/i18n'
import { getTimestampSecond } from '@src/utils/utils'
export const setLocales = (languageTag: LanguageTagType) => {
  changeLocale(languageTag)
  return async (dispatch: Dispatch) => {
    dispatch({
      type: APP_SETTING_LOCALES,
      payload: languageTag
    })
  }
}

export const setOpenLinkInApp = (openLinkInApp: boolean) => ({
  type: APP_SETTING_OPEN_LINK_IN_APP,
  payload: openLinkInApp
})

export const setICloudSyncTime = (iCloudTime?: number) => ({
  type: APP_SETTING_ICLOUD_TIME,
  payload: iCloudTime || getTimestampSecond()
})

export const setICloudSync = (iCloudSync: boolean) => ({
  type: APP_SETTING_ICLOUD_SYNC,
  payload: iCloudSync
})

export const setPasteFromClipboard = (
  pasteFromClipboard: boolean
) => ({
  type: APP_SETTING_PASTE_FROM_CLIPBOARD,
  payload: pasteFromClipboard
})
export const setTheme = (theme: ThemeType) => ({
  type: APP_SETTING_THEME,
  payload: theme
})
export const setThemeLightMode = (theme: ThemeType) => ({
  type: APP_SETTING_THEME_LIGHT_MODE,
  payload: theme
})
export const setThemeNightMode = (theme: ThemeType) => ({
  type: APP_SETTING_THEME_DARK_MODE,
  payload: theme
})
export const setHapticFeedback = (hapticFeedback: boolean) => ({
  type: APP_SETTING_HAPTIC_FEEDBACK,
  payload: hapticFeedback
})
