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
        d="M25.9375 20.6231C25.9375 20.8731 25.8125 21.1231 25.625 21.3106C25.25 21.6856 24.625 21.6231 24.3125 21.2481L15 10.8106L5.68749 21.2481C5.37499 21.6231 4.74999 21.6856 4.37499 21.3106C3.99999 20.9981 3.93749 20.3731 4.31249 19.9981L14.3125 8.74806C14.5 8.56056 14.75 8.43556 15 8.43556C15.25 8.43556 15.5 8.56056 15.6875 8.74806L25.6875 19.9981C25.875 20.1856 25.9375 20.3731 25.9375 20.6231Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
