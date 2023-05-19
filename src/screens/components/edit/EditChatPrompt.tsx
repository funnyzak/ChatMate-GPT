/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-12.
 */

import { setCurrentConversation } from '@src/actions'
import { useToast } from '@src/components'
import { useAppDispatch } from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService } from '@src/navigation'
import { useTheme } from '@src/theme'
import { ChatConversation } from '@src/types'
import React from 'react'
import { Input2Save } from './Input2Save'
import { useQuickAction } from '@src/helper'
export const EditChatPrompt = ({
  conversation
}: {
  conversation: ChatConversation
}) => {
  const dispatch = useAppDispatch()
  const { showMsg } = useQuickAction()
  return (
    <Input2Save
      title={translate('edit.chatPrompt')}
      description={translate('edit.chatPromptDescription')}
      // adviceInputText={conversation.prompt}
      inputInitialValue={conversation.prompt}
      inputPlaceholder={translate('edit.chatPromptPlaceholder')}
      textInputRequired={false}
      helpText={translate('tips.setPrompt')}
      helpCallback={() => {
        showMsg({
          type: 'info',
          text2: translate('tips.chatPrompt'),
          visibilityTime: 7000
        })
      }}
      textInputProps={{
        multiline: true,
        scrollEnabled: true,
        textAlignVertical: 'top'
      }}
      inputContainerStyle={{
        height: 100
      }}
      inputTextStyle={{
        height: 95,
        textAlign: 'left',
        textAlignVertical: 'top'
      }}
      submit={async (_val?: string) => {
        conversation.prompt = _val!
        dispatch(setCurrentConversation(conversation) as any)
        NavigationService.goBack()
      }}
    />
  )
}
