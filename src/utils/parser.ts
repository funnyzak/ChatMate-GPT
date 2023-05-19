/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

export const parseDate2Ts = (date: string) => {
  return new Date(Date.parse(date.replace(/-/g, '/'))).getTime()
}
