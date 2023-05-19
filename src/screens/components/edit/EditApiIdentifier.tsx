/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-23.
 */

import { setApiIdentifier } from '@src/actions'
import { OpenAIConst } from '@src/helper'
import {
  useAppDispatch,
  useAppSelector,
  useSettingAction
} from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import React from 'react'
import { Input2Save } from './Input2Save'
export const EditApiIdentifier = ({
  callback
}: {
  callback?: () => void
}) => {
  const { openAISetting, app } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const { effectOnRestartTips } = useSettingAction()
  return (
    <Input2Save
      title={translate('edit.editApiIdentifier')}
      adviceInputText={app.deviceInfo?.uniqueId}
      inputInitialValue={openAISetting.apiIdentifier}
      description={translate('edit.editApiIdentifierDescription')}
      inputPlaceholder={translate(
        'edit.editApiIdentifierPlaceholder'
      )}
      textInputRequired={false}
      helpText={translate('button.learnMore')}
      helpCallback={() => {
        NavigationService.navigate(ROUTES.WebViewer, {
          url: OpenAIConst.LINKS.Help.API_USER
        })
      }}
      submit={async (_val?: string) => {
        dispatch(setApiIdentifier(_val || ''))
        callback && callback()
        NavigationService.goBack()
      }}
    />
  )
}
