/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-16.
 */

import {
  removeConversation,
  setCurrentConversation,
  updateConversations
} from '@src/actions'
import { useToast } from '@src/components'
import { HELP_CUSTOM_API_SERVER_LINK } from '@src/config'
import {
  OpenAIAPITokenCost,
  calcOpenAIApiTokenCost,
  logInfo,
  replacePrompt,
  useQuickAction
} from '@src/helper'
import {
  CHAT_ACTION_MENU_TYPE,
  chatStat
} from '@src/helper/chatHelper'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { ShowInputSubmitSheet } from '@src/screens/components'
import { useTheme } from '@src/theme'
import { ChatConversation, ChatMessage } from '@src/types'
import { truncateString } from '@src/utils/utils'
import { useCallback, useMemo } from 'react'
// eslint-disable-next-line react-native/split-platform-components
import { Platform } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
export const useChatActionMenu = (conversation: ChatConversation) => {
  const dispatch = useAppDispatch()
  const { showMessage } = useToast()
  const { theme } = useTheme()
  const {
    copyText,
    share,
    showModelPrompt,
    showMsg,
    showActionButtons,
    openUrl,
    newChat,
    schemeURL,
    modelUsePermissionTips
  } = useQuickAction()
  const { openAISetting, setting } = useAppSelector((state) => state)
  const chatShortTitle = useMemo(
    () => truncateString(conversation.title, 30, '...', 'middle'),
    [conversation]
  )
  const model = useMemo(
    () => conversation?.config?.model || openAISetting.model,
    [conversation?.config?.model, openAISetting.model]
  )
  const stat = useCallback(() => {
    return chatStat(conversation)
  }, [conversation])
  const combineConversationMessages = useCallback(() => {
    const splitChars = '\n\n'
    let text =
      `${translate('common.title')}:${conversation.title}` +
      splitChars +
      `${translate('common.model')}: ${model}`
    if (conversation.messages && conversation.messages.length > 0)
      text +=
        splitChars +
        conversation
          .messages!.map((message: ChatMessage) => {
            const {
              prompt,
              message: { role, content }
            } = message
            let _message = role === 'user' ? '> ' : ''
            _message += (
              role === 'user' && prompt
                ? replacePrompt(prompt, content)
                : content
            ).trim()
            return _message
          })
          .join(splitChars)
    return text
  }, [conversation, model, setting.languageTag])
  const deleteChat = useCallback(() => {
    const deleteConfirm = () => {
      conversation &&
        dispatch(removeConversation([conversation.id]) as any)
      showMessage({
        type: 'success',
        text2: `${translate('common.delete')} ${translate(
          'common.success'
        ).toLowerCase()} ${translate('symbol.period')}`
      })
    }

    showActionButtons({
      title: translate('common.confirm'),
      description: translate('confirm.deleteConfirm').replace(
        '###',
        chatShortTitle
      ),
      buttons: [
        {
          text: translate('common.cancel'),
          style: 'cancel'
        },
        {
          text: translate('common.delete'),
          style: 'destructive',
          onPress: deleteConfirm
        }
      ],
      cancelButtonIndex: 0,
      destructiveButtonIndex: 1
    })
  }, [conversation, theme])
  const updateTemperature = useCallback(
    (temperature?: number) => {
      // logInfo('updateTemperature', temperature)
      conversation.config = {
        ...conversation.config,
        temperature
      }
      dispatch(updateConversations([conversation], true) as any)
    },
    [conversation]
  )
  const updateModel = useCallback(
    (_model: string) => {
      conversation.config = {
        ...conversation.config,
        model: _model
      }
      dispatch(updateConversations([conversation], true) as any)
      modelUsePermissionTips(_model)
    },
    [conversation]
  )

  const updatePrompt = useCallback(
    (prompt: string) => {
      conversation.prompt = prompt
      dispatch(updateConversations([conversation], true) as any)
    },
    [conversation]
  )
  const redirectChatPrompt = useCallback(() => {
    NavigationService.navigate(ROUTES.EditChatTitle, {
      type: 'chatprompt',
      data: {
        chat: conversation
      }
    })
  }, [conversation])
  const updateTitle = useCallback(
    (title: string) => {
      conversation.title = title
      dispatch(updateConversations([conversation], true) as any)
    },
    [conversation]
  )
  const editTitleActionSheet = useCallback(() => {
    ShowInputSubmitSheet({
      height: '75%',
      submitProps: {
        title: translate('edit.chatTitle'),
        description: translate('edit.chatTitleDescription'),
        inputInitialValue: conversation.title,
        inputPlaceholder: translate('edit.chatTitlePlaceholder'),
        buttonTitle: translate('common.save'),
        textInputProps: {
          inputMode: 'text',
          autoCorrect: false
        },
        submit: async (_apiserver?: string) => {
          ;(conversation.title =
            _apiserver ?? translate('chat.newChat')),
            dispatch(setCurrentConversation(conversation) as any)
          SheetManager.hide('submit-sheet')
        }
      }
    })
  }, [conversation])
  const EditTitle = useCallback(() => {
    if (Platform.OS === 'ios') {
      showPromptTitle()
    } else {
      redirectChatTitleForiOS()
    }
  }, [conversation])
  const redirectChatTitleForiOS = useCallback(() => {
    NavigationService.navigate(ROUTES.EditChatTitle, {
      type: 'chattitle',
      data: {
        chat: conversation
      }
    })
  }, [conversation])

  const copyShortcut = useCallback(() => {
    copyText(
      schemeURL.urlForOpenChat({
        id: conversation.id,
        say: translate('common.hello')
      }),
      translate('tips.openShortcutCopyed')
    )
  }, [conversation])

  const showPromptTitle = useCallback(() => {
    showModelPrompt({
      title: translate('edit.chatTitle'),
      description: translate('edit.chatTitleDescription'),
      buttons: [
        {
          text: translate('common.ok'),
          onPress: (title?: string) => {
            if (title && title.length > 0) {
              updateTitle(title)
            }
          },
          style: 'default'
        }
      ],
      defaultValue: conversation.title
    })
  }, [conversation])
  const chatMenuPress = useCallback(
    ({
      action,
      actionValue
    }: {
      action: CHAT_ACTION_MENU_TYPE
      actionValue?: string | number
    }) => {
      if (!conversation) return
      switch (action) {
        case 'delete':
          deleteChat()
          break
        case 'rename':
          showPromptTitle()
          break
        case 'prompt':
          redirectChatPrompt()
          break
        case 'new':
          newChat()
          break
        case 'shortcut':
          copyShortcut()
          break
        case 'copy':
          copyText(combineConversationMessages())
          break
        case 'share':
          share({
            message: combineConversationMessages()
          })
          break
        case 'temperature':
          updateTemperature(actionValue as number)
          break
        case 'model':
          updateModel(actionValue as string)
          break
        case 'stat':
          const _stat = stat()
          if (!_stat) {
            showMsg({
              type: 'warn',
              text2: translate('placeholder.noData')
            })
            return
          }

          showMsg({
            visibilityTime: 5000,
            type: 'info',
            text2: translate('tips.messageStat')
              .replace('{title}', conversation.title)
              .replace('{messages}', _stat.gptMessages.toString())
              .replace('{tokens}', (_stat.tokens || 0).toString())
              .replace('{cost}', (_stat.cost || 0).toString())
          })
          break
        case 'messages':
          logInfo('Update maxMessagesInContext', 'Value', actionValue)
          conversation.perference = {
            ...conversation.perference,
            maxMessagesInContext: actionValue as number
          }
          dispatch(updateConversations([conversation], true) as any)
          break
      }
    },
    [conversation, setting.languageTag]
  )
  return {
    chatMenuPress,
    deleteChat,
    updateModel,
    copyShortcut,
    EditTitle,
    showPromptTitle,
    updatePrompt,
    updateTitle,
    redirectChatTitle: redirectChatTitleForiOS,
    redirectChatPrompt,
    updateTemperature,
    combineConversationMessages,
    newChat
  }
}
