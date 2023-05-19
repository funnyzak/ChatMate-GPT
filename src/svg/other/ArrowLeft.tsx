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
        d="M20.6232 4.06056C20.8732 4.06056 21.1232 4.18556 21.3107 4.37306C21.6857 4.74806 21.6232 5.37306 21.2482 5.68556L10.8107 14.9981L21.2482 24.3106C21.6232 24.6231 21.6857 25.2481 21.3107 25.6231C20.9982 25.9981 20.3732 26.0606 19.9982 25.6856L8.74818 15.6856C8.56068 15.4981 8.43568 15.2481 8.43568 14.9981C8.43568 14.7481 8.56068 14.4981 8.74818 14.3106L19.9982 4.31056C20.1857 4.12306 20.3732 4.06056 20.6232 4.06056Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
