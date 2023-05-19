/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-05.
 */

import { useQuickAction } from '@src/helper'
import { SettingAppScreenProps as ScreenProps } from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon } from '@src/theme'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as CompS from '../components'
const SettingOther = ({ route, navigation }: ScreenProps) => {
  const { featureTips } = useQuickAction()
  useEffect(() => {
    featureTips('rowClickShowDetail')
  }, [])
  return (
    <>
      <ScrollView style={SylCommon.Layout.fill}>
        <CompS.SettingOther />
      </ScrollView>
    </>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting }
}
export default connect(mapStateToProps)(SettingOther)
