/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}>
      <Path
        d="M8.69625 19.6875H24.375V7.5H5.625V22.2469L8.69625 19.6875ZM4.6725 25.4813C4.59042 25.5496 4.49058 25.5932 4.38464 25.6069C4.2787 25.6206 4.17105 25.6038 4.07429 25.5586C3.97752 25.5134 3.89563 25.4415 3.8382 25.3514C3.78078 25.2614 3.75018 25.1568 3.75 25.05V7.5C3.75 7.00272 3.94754 6.52581 4.29917 6.17417C4.65081 5.82254 5.12772 5.625 5.625 5.625H24.375C24.8723 5.625 25.3492 5.82254 25.7008 6.17417C26.0525 6.52581 26.25 7.00272 26.25 7.5V19.6875C26.25 20.1848 26.0525 20.6617 25.7008 21.0133C25.3492 21.365 24.8723 21.5625 24.375 21.5625H9.375L4.6725 25.4813Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
