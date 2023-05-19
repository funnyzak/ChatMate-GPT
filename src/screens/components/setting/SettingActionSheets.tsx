/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import { translate } from '@src/i18n'
import React, { useEffect } from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { ThemeSettingOptions } from './SettingOptions'
export const ThemeSettingActionSheet = () => {
  useEffect(() => {
    SheetManager.show('node-sheet', {
      onClose: (data: any) => {},
      payload: {
        title: translate('action.appearanceSetting'),
        children: <ThemeSettingOptions />
      }
    })
  }, [])
  return null
}
