/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Linking } from 'react-native'
import * as Alert from './alert'
export * as Adapter from './adapter'
export * as Alert from './alert'
export * as Params from './params'
export * as Parser from './parser'
export * as Utils from './utils'
export const openUrl = async (url: string) => {
  const supported = await Linking.canOpenURL(url)
  try {
    await Linking.openURL(url)
  } catch (err) {
    Alert.alert({
      message: `Don't know how to open this URL: ${url}`
    })
  }
}
export function validKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}
/**
 * get url host
 * @param url eg: http://github.com:3022/123 return: github.com
 * @returns
 */
export function getUrlHost(url: string) {
  if (!url) return url
  // eslint-disable-next-line no-useless-escape
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
  const _host = matches && matches[1]
  return _host === null ? undefined : _host
}
/**
 * get url server
 * @param url eg: http://github.com:3022/123 return: http://github.com:3022
 * @returns
 */
export function getUrlServer(url: string) {
  // eslint-disable-next-line no-useless-escape
  const matches = url.match(/^https?\:\/\/([^\/?#]+)/i)
  return matches && matches[0]
}
