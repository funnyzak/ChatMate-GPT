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
        d="M9.37499 25.9375C9.12499 25.9375 8.87499 25.8125 8.68749 25.625C8.31249 25.25 8.37499 24.625 8.74999 24.3125L19.1875 15L8.74999 5.68749C8.37499 5.37499 8.31249 4.74999 8.68749 4.37499C8.99999 3.99999 9.62499 3.93749 9.99999 4.31249L21.25 14.3125C21.4375 14.5 21.5625 14.75 21.5625 15C21.5625 15.25 21.4375 15.5 21.25 15.6875L9.99999 25.6875C9.81249 25.875 9.62499 25.9375 9.37499 25.9375Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
