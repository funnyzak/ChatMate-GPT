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
        d="M13.5938 4.21875H4.6875C4.42969 4.21875 4.21875 4.42969 4.21875 4.6875V13.5938C4.21875 13.8516 4.42969 14.0625 4.6875 14.0625H13.5938C13.8516 14.0625 14.0625 13.8516 14.0625 13.5938V4.6875C14.0625 4.42969 13.8516 4.21875 13.5938 4.21875ZM12.0703 12.0703H6.21094V6.21094H12.0703V12.0703ZM25.3125 4.21875H16.4062C16.1484 4.21875 15.9375 4.42969 15.9375 4.6875V13.5938C15.9375 13.8516 16.1484 14.0625 16.4062 14.0625H25.3125C25.5703 14.0625 25.7812 13.8516 25.7812 13.5938V4.6875C25.7812 4.42969 25.5703 4.21875 25.3125 4.21875ZM23.7891 12.0703H17.9297V6.21094H23.7891V12.0703ZM25.3125 15.9375H16.4062C16.1484 15.9375 15.9375 16.1484 15.9375 16.4062V25.3125C15.9375 25.5703 16.1484 25.7812 16.4062 25.7812H25.3125C25.5703 25.7812 25.7812 25.5703 25.7812 25.3125V16.4062C25.7812 16.1484 25.5703 15.9375 25.3125 15.9375ZM23.7891 23.7891H17.9297V17.9297H23.7891V23.7891ZM12.4219 20.8594H8.67188V17.1094C8.67188 16.9805 8.56641 16.875 8.4375 16.875H7.03125C6.90234 16.875 6.79688 16.9805 6.79688 17.1094V20.8594H3.04688C2.91797 20.8594 2.8125 20.9648 2.8125 21.0938V22.5C2.8125 22.6289 2.91797 22.7344 3.04688 22.7344H6.79688V26.4844C6.79688 26.6133 6.90234 26.7188 7.03125 26.7188H8.4375C8.56641 26.7188 8.67188 26.6133 8.67188 26.4844V22.7344H12.4219C12.5508 22.7344 12.6562 22.6289 12.6562 22.5V21.0938C12.6562 20.9648 12.5508 20.8594 12.4219 20.8594Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon