/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg
      viewBox="0 0 15 15"
      fill="none"
      width={20}
      height={20}
      {...props}>
      <Path
        d="M7.5 0.5C11.3665 0.5 14.5 3.63348 14.5 7.5C14.5 11.3664 11.3649 14.5 7.5 14.5C3.63514 14.5 0.5 11.3649 0.5 7.5C0.5 3.63507 3.63355 0.5 7.5 0.5Z"
        fill="white"
        stroke={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
