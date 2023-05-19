/**
 * Created by leon<silenceace@gmail.com> on 5/11/2023 10:26:20 AM
 */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'

import { translate } from '@src/i18n'
import { useTheme, SylCommon } from '@src/theme'
import { IState, Theme } from '@src/types'
import * as CompS from '../components'
import { Text, Spinner } from '@src/components'
import { ICloudSyncScreenProps as ScreenProps } from '@src/navigation/routes'
import { RootState } from '@src/store'

const ICloudSync = ({ route, navigation, loading }: ScreenProps) => {
  const { theme } = useTheme()
  return (
    <View style={SylCommon.Layout.fill}>
      <CompS.ICloudSyncSettingGroup />
    </View>
  )
}

/**
 * @description styles ICloudSync
 */
const styles = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1
  })
}

/**
 * default props
 */
ICloudSync.defaultProps = {
  loading: false
}

const mapStateToProps = (state: RootState) => {
  return { setting: state.setting }
}

export default connect(mapStateToProps)(ICloudSync)
