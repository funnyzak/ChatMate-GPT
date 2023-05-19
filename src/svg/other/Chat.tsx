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
        d="M23.3859 17.3592V5.19607C23.3859 4.16267 22.5481 3.32483 21.5147 3.32483H3.73782C2.70442 3.32483 1.86658 4.16267 1.86658 5.19607V17.3592C1.86658 18.3926 2.70442 19.2304 3.73782 19.2304H5.60906V23.9085L10.2872 19.2304H21.5147C22.548 19.2304 23.3859 18.3926 23.3859 17.3592ZM9.51238 17.3592L7.48027 19.3913V17.3592H3.73782V5.19607H21.5147V17.3592H9.51238ZM26.1928 6.13171H24.3216V8.00295H26.1928V20.1661H22.4503V22.1981L20.4182 20.1661H11.2228V22.0373H19.6434L24.3215 26.7154V22.0373H26.1928C27.2262 22.0373 28.064 21.1994 28.064 20.1661V8.00295C28.064 6.96955 27.2261 6.13171 26.1928 6.13171Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
