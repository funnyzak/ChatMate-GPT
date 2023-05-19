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
        d="M25.2143 14.2143H15.7857V4.78571C15.7857 4.36667 15.419 4 15 4C14.581 4 14.2143 4.36667 14.2143 4.78571V14.2143H4.78571C4.36667 14.2143 4 14.581 4 15C4 15.419 4.36667 15.7857 4.78571 15.7857H14.2143V25.2143C14.2143 25.6333 14.581 26 15 26C15.419 26 15.7857 25.6333 15.7857 25.2143V15.7857H25.2143C25.6333 15.7857 26 15.419 26 15C26 14.581 25.6333 14.2143 25.2143 14.2143Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
