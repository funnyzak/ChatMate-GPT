/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import {
  createNavigationContainerRef,
  NavigationContainerRefWithCurrent
} from '@react-navigation/native'
import { RootStackParamList } from './routes'
let navigationRef = createNavigationContainerRef<RootStackParamList>()
function setTopLevelNavigator(
  navigatorRef: NavigationContainerRefWithCurrent<RootStackParamList>
) {
  navigationRef = navigatorRef
}
function navigate(
  screen: keyof RootStackParamList,
  params: any = undefined
) {
  navigationRef.navigate(screen, params)
}
function goBack() {
  navigationRef.goBack()
}
export type NavigationType =
  NavigationContainerRefWithCurrent<RootStackParamList>
// add other navigation functions that you need and export them

const waitForNavigationToBeReady = () => {
  const checkIfReady = (resolve: (value: unknown) => void) => {
    if (navigationRef !== null && navigationRef.isReady()) {
      resolve(true)
    }

    setTimeout(() => {
      checkIfReady(resolve)
    }, 25)
  }

  return new Promise((resolve) => {
    checkIfReady(resolve)
  })
}

export default {
  goBack,
  navigationRef,
  waitForNavigationToBeReady,
  navigate,
  setTopLevelNavigator
}
