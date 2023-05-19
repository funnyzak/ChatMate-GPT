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
        d="M15 3.33333C21.5333 3.33333 26.6667 8.46667 26.6667 15C26.6667 21.5333 21.5333 26.6667 15 26.6667C8.46667 26.6667 3.33333 21.5333 3.33333 15C3.33333 8.46667 8.46667 3.33333 15 3.33333ZM15 1C7.3 1 1 7.3 1 15C1 22.7 7.3 29 15 29C22.7 29 29 22.7 29 15C29 7.3 22.7 1 15 1Z"
        fill={props.color}
      />
      <Path
        d="M16.1667 11.5H24.8C24.5667 11.0333 24.3334 10.3333 24.1 9.86667H16.1667V11.5Z"
        fill={props.color}
      />
      <Path
        d="M16.1667 18.5V20.1333H24.1C24.3334 19.6667 24.5667 18.9667 24.8 18.5H16.1667Z"
        fill={props.color}
      />
      <Path
        d="M16.1667 22.7V24.3333H19.6667C20.6 23.8667 21.3 23.4 22 22.7H16.1667Z"
        fill={props.color}
      />
      <Path
        d="M25.5 14.3H16.1667V15.9333H25.5C25.5 15.7 25.5 15.4667 25.5 15C25.5 14.5333 25.5 14.5333 25.5 14.3Z"
        fill={props.color}
      />
      <Path
        d="M16.1667 7.29999H22C21.3 6.59999 20.6 6.13332 19.6667 5.66666H16.1667V7.29999Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
