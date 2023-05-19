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
        d="M15 20.9375C14.75 20.9375 14.5 20.875 14.3125 20.6875L4.3125 10.6875C3.9375 10.3125 3.9375 9.75 4.3125 9.375C4.6875 9 5.25 9 5.625 9.375L15 18.6875L24.3125 9.3125C24.6875 8.9375 25.25 8.9375 25.625 9.3125C26 9.6875 26 10.25 25.625 10.625L15.625 20.625C15.5 20.875 15.25 20.9375 15 20.9375Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
