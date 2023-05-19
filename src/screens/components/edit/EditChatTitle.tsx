/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-08.
 */

import { setCurrentConversation } from '@src/actions'
import { useAppDispatch } from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService } from '@src/navigation'
import { ChatConversation } from '@src/types'
import React from 'react'
import { Input2Save } from './Input2Save'
export const EditChatTitle = ({
  conversation
}: {
  conversation: ChatConversation
}) => {
  const dispatch = useAppDispatch()
  return (
    <Input2Save
      title={translate('edit.chatTitle')}
      description={translate('edit.chatTitleDescription')}
      adviceInputText={conversation.title}
      inputInitialValue={conversation.title}
      inputPlaceholder={translate('edit.chatTitlePlaceholder')}
      submit={async (_val?: string) => {
        conversation.title = _val!
        dispatch(setCurrentConversation(conversation) as any)
        NavigationService.goBack()
      }}
    />
  )
}
