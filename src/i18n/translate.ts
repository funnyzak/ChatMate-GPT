/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import i18n from 'i18n-js'
export function translate(
  key: string,
  options?: i18n.TranslateOptions
) {
  return key ? i18n.t(key, options) : key
}
