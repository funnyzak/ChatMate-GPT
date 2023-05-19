/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-03.
 */

import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 1024 1024" width="256" height="256" {...props}>
      <Path
        d="M608 960a32.64 32.64 0 0 1-32-22.4L352 204.8 128 937.6a32 32 0 1 1-64-19.2l256-832a33.28 33.28 0 0 1 64 0l256 832a32.64 32.64 0 0 1-21.12 40.32z"
        fill={props.color}
        p-id="2117"
      />
      <Path
        d="M487.68 608H204.16a32 32 0 1 1 0-64h283.52a32 32 0 0 1 0 64zM928 960a32.64 32.64 0 0 1-30.72-22.4l-97.28-320-97.28 320a32 32 0 1 1-64-19.2l128-416a33.28 33.28 0 0 1 64 0l128 416a32.64 32.64 0 0 1-21.12 40.32z"
        fill={props.color}
        p-id="2118"
      />
      <Path
        d="M867.84 784h-141.44a32 32 0 0 1 0-64h141.44a32 32 0 1 1 0 64z"
        fill={props.color}
        p-id="2119"
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon
