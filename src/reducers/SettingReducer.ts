/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import {
  APP_SETTING_HAPTIC_FEEDBACK,
  APP_SETTING_LOCALES,
  APP_SETTING_PASTE_FROM_CLIPBOARD,
  APP_SETTING_THEME,
  APP_SETTING_ICLOUD_SYNC,
  APP_SETTING_OPEN_LINK_IN_APP,
  APP_SETTING_ICLOUD_TIME,
  APP_SETTING_THEME_DARK_MODE,
  APP_SETTING_THEME_LIGHT_MODE,
  Action,
  IState
} from '../types'
const INITIAL_STATE: IState.SettingState = {
  languageTag: 'auto',
  theme: 'auto',
  icloudSync: false,
  themeNightMode: 'black',
  themeLightMode: 'grey',
  hapticFeedback: true,
  pasteFromClipboard: false,
  openLinkInApp: false
}
export default (
  state: IState.SettingState = INITIAL_STATE,
  action: Action
): IState.SettingState => {
  switch (action.type) {
    case APP_SETTING_OPEN_LINK_IN_APP:
      return { ...state, openLinkInApp: action.payload }
    case APP_SETTING_ICLOUD_TIME:
      return { ...state, lastSyncTime: action.payload }
    case APP_SETTING_ICLOUD_SYNC:
      return { ...state, icloudSync: action.payload }
    case APP_SETTING_PASTE_FROM_CLIPBOARD:
      return { ...state, pasteFromClipboard: action.payload }
    case APP_SETTING_LOCALES:
      return { ...state, languageTag: action.payload }
    case APP_SETTING_THEME:
      return { ...state, theme: action.payload }
    case APP_SETTING_THEME_LIGHT_MODE:
      return { ...state, themeLightMode: action.payload }
    case APP_SETTING_THEME_DARK_MODE:
      return { ...state, themeNightMode: action.payload }
    case APP_SETTING_HAPTIC_FEEDBACK:
      return { ...state, hapticFeedback: action.payload }
    default:
      return state
  }
}
