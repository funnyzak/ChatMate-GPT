/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-03.
 */

import HapticFeedback from 'react-native-haptic-feedback'
export const haptic = (trigger?: {
  type?: string
  options?: {
    enableVibrateFallback?: boolean
    ignoreAndroidSystemSettings?: boolean
  }
}) => {
  const { type = 'impactLight', options } = trigger || {}
  HapticFeedback.trigger(type, options)
}
