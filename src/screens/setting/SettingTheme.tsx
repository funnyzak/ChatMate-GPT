/**
 * Created by Leon<silenceace@gmail.com> at 2023-05-12.
 */

import { SettingThemeScreenProps as ScreenProps } from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon } from '@src/theme'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as CompS from '../components'
const SettingTheme = ({ route, navigation }: ScreenProps) => {
  return (
    <>
      <ScrollView style={SylCommon.Layout.fill}>
        <CompS.AppearanceGroupSetting />
      </ScrollView>
    </>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting }
}
export default connect(mapStateToProps)(SettingTheme)
