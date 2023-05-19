/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import { translate } from '@src/i18n'
import { useTheme, SylCommon } from '@src/theme'
import { IState, Theme } from '@src/types'
import * as CompS from '../components'
import { Text, Spinner } from '@src/components'
import { PrivacyPolicyScreenProps as ScreenProps } from '@src/navigation/routes'
import { RootState } from '@src/store'
const PrivacyPolicy = ({
  route,
  navigation,
  loading
}: ScreenProps) => {
  const { theme } = useTheme()
  return (
    <View style={SylCommon.Layout.fill}>
      <Text>Hello, PrivacyPolicy.</Text>
    </View>
  )
}
/**
 * @description styles PrivacyPolicy
 */
const styles = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1
  })
}
/**
 * default props
 */
PrivacyPolicy.defaultProps = {
  loading: false
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting }
}
export default connect(mapStateToProps)(PrivacyPolicy)
