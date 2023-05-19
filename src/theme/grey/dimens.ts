/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import { Dimensions as _Dimensions } from 'react-native'
const screenWidth = _Dimensions.get('window').width
const screenHeight = _Dimensions.get('window').height
import { Dimensions } from '../types'
const layoutContainerHorizontalMargin = 20
const dimens: Dimensions = {
  WINDOW_WIDTH: screenWidth,
  WINDOW_HEIGHT: screenHeight,
  layoutContainerWidth:
    screenWidth - layoutContainerHorizontalMargin * 2,
  layoutContainerHorizontalMargin: layoutContainerHorizontalMargin,
  headerButtonSize: 26,
  headerHeight: 50,
  borderRadius: 5,
  badgeSize: 18,
  defaultButtonWidth:
    screenWidth - layoutContainerHorizontalMargin * 2,
  defaultButtonHeight: 45,
  defaultButtonRadius: 8,
  defaultLineWidth: 0.3,
  defaultInputBoxHeight: 45
}
export default dimens
