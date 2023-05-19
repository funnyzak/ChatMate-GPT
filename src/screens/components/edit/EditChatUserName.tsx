/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-08.
 */

import { setChatSettingUserName } from '@src/actions'
import {
  useAppDispatch,
  useAppSelector,
  useSettingAction
} from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService } from '@src/navigation'
import React from 'react'
import { Input2Save } from './Input2Save'
export const EditChatUserName = ({
  callback
}: {
  callback?: () => void
}) => {
  const { chatSetting } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const { effectOnRestartTips } = useSettingAction()
  return (
    <Input2Save
      title={translate('edit.chatUserName')}
      inputInitialValue={chatSetting.userName}
      description={translate('edit.chatUserNameDescription')}
      inputPlaceholder={translate('edit.chatUserNamePlaceholder')}
      textInputRequired={false}
      submit={async (_val?: string) => {
        dispatch(setChatSettingUserName(_val || ''))
        effectOnRestartTips()
        callback && callback()
        NavigationService.goBack()
      }}
    />
  )
}
