/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-08.
 */

import DeviceInfo from 'react-native-device-info'
import Restart from 'react-native-restart'
export const restartApp = () => {
  Restart.restart()
}
export const getDeviceInfo = async () => {
  const deviceInfo = {
    brand: await DeviceInfo.getBrand(),
    bundleId: await DeviceInfo.getBundleId(),
    deviceName: await DeviceInfo.getDeviceName(),
    modal: await DeviceInfo.getModel(),
    phoneNum: await DeviceInfo.getPhoneNumber(),
    systemName: await DeviceInfo.getSystemName(),
    systemVersion: await DeviceInfo.getSystemVersion(),
    uniqueId: await DeviceInfo.getUniqueId(),
    userAgent: await DeviceInfo.getUserAgent(),
    version: {
      version: await DeviceInfo.getVersion(),
      buildId: await DeviceInfo.getBuildNumber(),
      buildNumber: await DeviceInfo.getBuildNumber()
    }
  }
  return deviceInfo
}
