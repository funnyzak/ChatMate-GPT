/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { I18nManager } from 'react-native'
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import { logInfo } from '@src/helper'
const en = require('./locales/en-US')
const zh = require('./locales/zh-CN')
const ja = require('./locales/ja-JP')
const tw = require('./locales/zh-TW')

// Should the app fallback to English if user locale doesn't exists
i18n.fallbacks = true
// Define the supported translation
const translations = {
  'en-US': en,
  'zh-CN': zh,
  // 'ja-JP': ja,
  'zh-TW': tw
} as const
i18n.translations = translations
const fallback = { languageTag: 'en-US', isRTL: false }

const { languageTag, isRTL } =
  RNLocalize.findBestAvailableLanguage(
    Object.keys(i18n.translations)
  ) || fallback

// update layout direction
I18nManager.forceRTL(isRTL)

logInfo(
  'getlocaltes',
  RNLocalize.getLocales(),
  'languageTag',
  languageTag
)
i18n.locale = languageTag

export default i18n
export type LanguageTagType = keyof typeof translations | 'auto'

export const translationTitle = {
  'auto': 'Auto',
  'en-US': 'English',
  // 'ja-JP': '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文'
}
