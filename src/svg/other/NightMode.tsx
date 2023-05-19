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
        d="M15.5 29C22.956 29 29 22.956 29 15.5C29 8.04395 22.956 2 15.5 2C8.04395 2 2 8.04395 2 15.5C2 22.956 8.04395 29 15.5 29ZM15.5 26.975V4.025C18.5434 4.025 21.4621 5.23397 23.614 7.38595C25.766 9.53793 26.975 12.4566 26.975 15.5C26.975 18.5434 25.766 21.4621 23.614 23.614C21.4621 25.766 18.5434 26.975 15.5 26.975Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
