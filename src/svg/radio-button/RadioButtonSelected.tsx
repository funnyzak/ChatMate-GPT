/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg
      viewBox="0 0 15 15"
      width={20}
      height={20}
      fill="none"
      {...props}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 0C11.6422 0 15 3.35775 15 7.5C15 11.6422 11.6422 15 7.5 15C3.35775 15 0 11.6422 0 7.5C0 3.35775 3.35775 0 7.5 0Z"
        fill={props.color || '#FFD700'}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4389 5.4546H10.2577V5.4546C10.2174 5.45457 10.1788 5.46977 10.1502 5.49686L6.91107 8.57818L5.1903 6.94199C5.16195 6.91485 5.12344 6.89953 5.08322 6.89937H3.90162H3.90162C3.81774 6.8995 3.74986 6.9643 3.75 7.04409C3.75007 7.08235 3.76609 7.11902 3.79454 7.14606L6.50821 9.72748C6.61946 9.83331 6.76526 9.88641 6.91068 9.88641H6.9198C7.06256 9.88424 7.20457 9.83115 7.31354 9.72748L11.5464 5.70128V5.70128C11.6057 5.64489 11.6058 5.55342 11.5465 5.49696C11.518 5.46981 11.4793 5.45456 11.4389 5.45459L11.4389 5.4546Z"
        fill="white"
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
