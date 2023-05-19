/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-04.
 */

import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 1024 1024" width="30" height="30" {...props}>
      <Path
        d="M243.2 512m-83.2 0a1.3 1.3 0 1 0 166.4 0 1.3 1.3 0 1 0-166.4 0Z"
        p-id="3571"
        fill={props.color}
      />
      <Path
        d="M512 512m-83.2 0a1.3 1.3 0 1 0 166.4 0 1.3 1.3 0 1 0-166.4 0Z"
        p-id="3572"
        fill={props.color}
      />
      <Path
        d="M780.8 512m-83.2 0a1.3 1.3 0 1 0 166.4 0 1.3 1.3 0 1 0-166.4 0Z"
        p-id="3573"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
