/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { SettingScreenProps as ScreenProps } from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as CompS from '../components'
const Setting = ({ route, navigation }: ScreenProps) => {
  const { theme } = useTheme()
  return (
    <>
      <ScrollView style={SylCommon.Layout.fill}>
        <CompS.Settings />
      </ScrollView>
    </>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting }
}
export default connect(mapStateToProps)(Setting)
