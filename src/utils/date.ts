/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-12.
 */

import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ja'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export const fromNow = (date?: string | number | Date) => {
  return dayjs(date).fromNow() ?? ''
}
export const changeDayJsLocale = (locale: string) => {
  dayjs.locale(locale)
}
