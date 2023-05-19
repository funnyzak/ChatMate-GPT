/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import i18n, { LanguageTagType, translationTitle } from './i18n'
export * from './translate'
export { i18n, translationTitle }
export type { LanguageTagType }
export function changeLocale(language: LanguageTagType) {
  i18n.locale = language === 'auto' ? i18n.currentLocale() : language
}
export function getLocale() {
  return i18n.locale
}
