/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-06.
 */

import { useToast } from '@src/components'
import { translate } from '@src/i18n'
import { EditChatTitleScreenProps as ScreenProps } from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import * as CompS from '../components'
const EditChatName = ({ route, navigation }: ScreenProps) => {
  const { theme } = useTheme()
  const { showMessage } = useToast()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: ''
    })
  }, [navigation])
  const { type, data } = route.params
  return (
    <View
      style={[
        SylCommon.Layout.fill,
        SylCommon.Card.container(theme),
        {
          flex: 1
        }
      ]}>
      {type === 'chattitle' ? (
        <CompS.EditChatTitle conversation={data?.chat} />
      ) : type === 'username' ? (
        <CompS.EditChatUserName />
      ) : type === 'chatprompt' ? (
        <CompS.EditChatPrompt conversation={data?.chat} />
      ) : type === 'apiidentifier' ? (
        <CompS.EditApiIdentifier />
      ) : (
        <CompS.EditChatAvatar />
      )}
    </View>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting }
}
export default connect(mapStateToProps)(EditChatName)
