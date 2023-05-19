/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logError } from '@src/helper/logger'
import { RootState } from '@src/store'
import { APP_INIT, APP_INIT_ERROR } from '@src/types'
import DeviceInfo from 'react-native-device-info'
import { Dispatch } from 'redux'

export const initApp = () => {
  return async (dispatch: Dispatch, _getState: () => RootState) => {
    try {
      // const userApiKey = await AsyncStorage.getItem(OPEN_AI_APPKEY)

      // 检查语言设置
      // if (!Object.keys(translationTitle).includes(getLocale())) {
      //   logInfo(
      //     'If current locale not in translation, then set default language to en-US locale...'
      //   )
      //   dispatch(setLocales('en-US') as any)
      // }

      dispatch({
        type: APP_INIT,
        payload: {
          name: await DeviceInfo.getApplicationName(),
          deviceInfo: {
            brand: await DeviceInfo.getBrand(),
            bundleId: await DeviceInfo.getBundleId(),
            deviceName: await DeviceInfo.getDeviceName(),
            modal: await DeviceInfo.getModel(),
            phoneNum: await DeviceInfo.getPhoneNumber(),
            systemName: await DeviceInfo.getSystemName(),
            systemVersion: await DeviceInfo.getSystemVersion(),
            uniqueId: await DeviceInfo.getUniqueId(),
            userAgent: await DeviceInfo.getUserAgent()
          },
          version: {
            version: await DeviceInfo.getVersion(),
            buildId: await DeviceInfo.getBuildNumber(),
            buildNumber: await DeviceInfo.getBuildNumber()
          }
        }
      })
    } catch (error: any) {
      logError(error)
      dispatch({
        type: APP_INIT_ERROR,
        payload: { errorMessage: error.message }
      })
    }
  }
}
