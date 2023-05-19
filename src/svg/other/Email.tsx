/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg
      viewBox="0 0 30 30"
      fill="none"
      width={25}
      height={25}
      {...props}>
      <Path
        d="M25.625 5.3125H4.375C3.1875 5.3125 2.1875 6.3125 2.1875 7.5V22.5C2.1875 23.6875 3.1875 24.6875 4.375 24.6875H25.625C26.8125 24.6875 27.8125 23.6875 27.8125 22.5V7.5C27.8125 6.3125 26.8125 5.3125 25.625 5.3125ZM4.375 7.1875H25.625C25.8125 7.1875 25.9375 7.3125 25.9375 7.5V8.25L15 15.125L4.0625 8.25V7.5C4.0625 7.3125 4.1875 7.1875 4.375 7.1875ZM25.625 22.8125H4.375C4.1875 22.8125 4.0625 22.6875 4.0625 22.5V10.4375L14.5 17C14.625 17.125 14.8125 17.125 15 17.125C15.1875 17.125 15.375 17.0625 15.5 17L25.9375 10.4375V22.5C25.9375 22.6875 25.8125 22.8125 25.625 22.8125Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
