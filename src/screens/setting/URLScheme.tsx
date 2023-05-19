/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-05.
 */

import { URLSchemeScreenProps as ScreenProps } from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as CompS from '../components'
const URLScheme = ({ route, navigation }: ScreenProps) => {
  const { theme } = useTheme()
  return (
    <>
      <ScrollView style={SylCommon.Layout.fill}>
        <CompS.URLSchemeGroupSetting />
      </ScrollView>
    </>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting }
}
export default connect(mapStateToProps)(URLScheme)
