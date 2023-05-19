/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import dayjs from 'dayjs'
// import BugSnag from '@bugsnag/react-native'
// BugSnag.start({
//   context: 'context',
//   onBreadcrumb: (breadcrumb) => {
//     console.log('onBreadcrumb', breadcrumb)
//   },
//   onError: (event, cb) => {
//     console.log('onError', event)
//     cb(null, true)
//   },
//   logger: {
//     debug: (...args) => {
//       console.log('debug', args)
//     },
//     info: (...args) => {
//       console.log('info', args)
//     },
//     warn: (...args) => {
//       console.log('warn', args)
//     },
//     error: (...args) => {
//       console.log('error', args)
//     }
//   },
//   metadata: {
//     key: 'value'
//   },
//   featureFlags: [],
//   plugins: [],
//   user: {
//     id: 'id',
//     name: 'name',
//     email: 'email'
//   }
// })
// export default BugSnag
const logStart = (level = 'info') =>
  dayjs(new Date()).format(
    `[Time:] YYYY-MM-DDTHH:mm:ssZ[Z], [Level:${level.toUpperCase()}], [message:]`
  )
export const logError = (error: any) => {
  console.error(`${logStart()}`, ...error)
}
export const logInfo = (...info: any[]) => {
  const hasError = info.some((item) => item instanceof Error)
  console.log(`${logStart(hasError ? 'error' : 'info')}`, ...info)
  // if (hasError) {
  //   console.error(`${logStart('error')}`, ...info)
  // } else {
  //   console.log(`${logStart('info')}`, ...info)
  // }
}
