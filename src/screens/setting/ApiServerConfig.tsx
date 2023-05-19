/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import { HELP_CUSTOM_API_SERVER_LINK } from '@src/config/constants'
import { useSettingAction } from '@src/hooks'
import { translate } from '@src/i18n'
import {
  ROUTES,
  ApiServerConfigScreenProps as ScreenProps
} from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { InputText2Submit } from '../components'
const ApiServerConfig = ({
  route,
  navigation,
  setting
}: ScreenProps & {
  setting: RootState['openAISetting']
}) => {
  const { theme } = useTheme()
  const { setOpenAIApiServer } = useSettingAction()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: ''
    })
  }, [navigation])
  return (
    <View
      style={
        (SylCommon.Layout.fill, SylCommon.Card.container(theme))
      }>
      <InputText2Submit
        tipsText={translate('setting.apiserver.tips')}
        tipsPressCallback={() => {
          navigation.push(ROUTES.WebViewer, {
            url: HELP_CUSTOM_API_SERVER_LINK
          })
        }}
        title={translate('setting.apiserver.title')}
        description={translate('setting.apiserver.description')}
        inputPlaceholder={translate('setting.apiserver.placeholder')}
        inputInitialValue={setting.apiServer}
        textInputProps={{
          inputMode: 'url',
          returnKeyType: 'done',
          autoFocus: true,
          maxLength: 300
        }}
        buttonTitle={translate('setting.apiserver.verifyAndSave')}
        submit={async (server?: string) => {
          if (await setOpenAIApiServer(server)) {
            navigation.goBack()
          }
        }}
      />
    </View>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.openAISetting }
}
export default connect(mapStateToProps)(ApiServerConfig)
