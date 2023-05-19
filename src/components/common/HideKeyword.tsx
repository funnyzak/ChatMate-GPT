/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-06.
 */

import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
export const HideKeyboard = ({
  children
}: {
  children: React.ReactNode
}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)
