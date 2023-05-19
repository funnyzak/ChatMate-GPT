/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-08.
 */

import { setChatSettingAvatarLink } from '@src/actions'
import { useToast } from '@src/components'
import {
  useAppDispatch,
  useAppSelector,
  useSettingAction
} from '@src/hooks'
import { translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import React from 'react'
import { Input2Save } from './Input2Save'
import { NavigationService } from '@src/navigation'
export const EditChatAvatar = ({
  callback
}: {
  callback?: () => void
}) => {
  const { chatSetting } = useAppSelector((state) => state)
  const { effectOnRestartTips } = useSettingAction()
  const dispatch = useAppDispatch()
  return (
    <Input2Save
      inputInitialValue={chatSetting.avatarImgUrl}
      title={translate('edit.chatAvatarLink')}
      description={translate('edit.chatAvatarLinkDescription')}
      inputPlaceholder={translate('edit.chatAvatarLinkPlaceholder')}
      textInputRequired={false}
      submit={async (_val?: string) => {
        dispatch(setChatSettingAvatarLink(_val || ''))
        effectOnRestartTips()
        callback && callback()
        NavigationService.goBack()
      }}
    />
  )
}
