/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import {
  setChatModel,
  setChatSettingConversationsOrderBy,
  setChatSettingFontSizeRatio,
  setChatSettingMessageBubbleBehavior,
  setLocales,
  setTheme,
  setThemeLightMode,
  setThemeNightMode
} from '@src/actions'
import {
  CHAT_ACTION_MENU_TYPE_LIST,
  ChatFontSizeRatio,
  OpenAICompletionModelType,
  OpenAIModels,
  useQuickAction
} from '@src/helper'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import {
  LanguageTagType,
  translate,
  translationTitle
} from '@src/i18n'
import {
  ThemeType,
  darkThems,
  lightThems,
  themes,
  useTheme
} from '@src/theme'
import { restartApp } from '@src/utils/devices'
import React from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { RadioOption } from '../common'
import { TableList } from '../list'
export const ChatModelSettingOptions = () => {
  const { theme } = useTheme()
  const _model = useAppSelector((state) => state.openAISetting.model)
  const appDispatch = useAppDispatch()
  const { modelUsePermissionTips } = useQuickAction()
  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={OpenAIModels.map((model_name: string) => {
        return {
          title: `${model_name}`,
          // subTitle: `${OpenAIModelMaxToken[
          //   model_name as OpenAICompletionModelType
          // ].toString()} Tokens`,
          rightNode: RadioOption(model_name === _model),
          onPress() {
            appDispatch(
              setChatModel(model_name as OpenAICompletionModelType)
            )
            modelUsePermissionTips(model_name)
            SheetManager.hide('node-sheet')
          }
        }
      })}
    />
  )
}
export const ThemeSettingOptions = () => {
  const { theme, resetTheme } = useTheme()
  const appDispatch = useAppDispatch()
  const _theme = useAppSelector((state) =>
    state.setting.theme.toLowerCase()
  )
  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={Object.keys(themes).map((theme_name: string) => {
        return {
          title: translate(`theme.${theme_name}`),
          rightNode: RadioOption(theme_name === _theme),
          onPress() {
            appDispatch(setTheme(theme_name as ThemeType))
            resetTheme(theme_name as ThemeType)
            SheetManager.hide('node-sheet')
          }
        }
      })}
    />
  )
}
export const ThemeLightModeSettingOptions = () => {
  const { theme } = useTheme()
  const appDispatch = useAppDispatch()
  const _theme = useAppSelector((state) =>
    state.setting.themeLightMode.toLowerCase()
  )
  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={Object.keys(lightThems).map((theme_name: string) => {
        return {
          title: translate(`theme.${theme_name}`),
          rightNode: RadioOption(theme_name === _theme),
          onPress() {
            appDispatch(setThemeLightMode(theme_name as ThemeType))
            SheetManager.hide('node-sheet')
          }
        }
      })}
    />
  )
}
export const ThemeNightModeSettingOptions = () => {
  const { theme } = useTheme()
  const appDispatch = useAppDispatch()
  const _theme = useAppSelector((state) =>
    state.setting.themeNightMode.toLowerCase()
  )
  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={Object.keys(darkThems).map((theme_name: string) => {
        return {
          title: translate(`theme.${theme_name}`),
          rightNode: RadioOption(theme_name === _theme),
          onPress() {
            appDispatch(setThemeNightMode(theme_name as ThemeType))
            SheetManager.hide('node-sheet')
          }
        }
      })}
    />
  )
}

export const ConversationOrderBySettingOptions = () => {
  const { theme } = useTheme()
  const appDispatch = useAppDispatch()
  const { chatSetting } = useAppSelector((state) => state)
  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={['createTime', 'updateTime'].map((name: string) => {
        return {
          title: translate(`common.${name}`),
          rightNode: RadioOption(
            name === chatSetting.conversationOrderBy
          ),
          onPress() {
            appDispatch(
              setChatSettingConversationsOrderBy(name as any)
            )
            SheetManager.hide('node-sheet')
          }
        }
      })}
    />
  )
}

export const ChatFontSizeRatioSettingOptions = () => {
  const { theme } = useTheme()
  const appDispatch = useAppDispatch()
  const { chatSetting } = useAppSelector((state) => state)

  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={['normal', 'large', 'larger'].map((name: string) => {
        return {
          title: translate(`common.${name}`),
          rightNode: RadioOption(
            ChatFontSizeRatio[name] === chatSetting.fontSizeRatio
          ),
          onPress() {
            appDispatch(
              setChatSettingFontSizeRatio(ChatFontSizeRatio[name])
            )
            SheetManager.hide('node-sheet')
          }
        }
      })}
    />
  )
}

export const LanguageGroupSettingOptions = () => {
  const { theme } = useTheme()
  const appDispatch = useAppDispatch()
  const _language = useAppSelector(
    (state) => state.setting.languageTag
  )
  const setting = useAppSelector((state) => state.setting)
  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={Object.keys(translationTitle).map(
        (language_name: string) => {
          return {
            title: translate(`locale.${language_name}`),
            rightNode: RadioOption(language_name === _language),
            onPress: () => {
              SheetManager.hide('node-sheet')
              setLocales(language_name as LanguageTagType)(
                appDispatch
              )
              setTimeout(restartApp, 500)
            }
          }
        }
      )}
    />
  )
}

export const MessageBubblePressBehaviorSettingOptions = () => {
  const { theme } = useTheme()
  const appDispatch = useAppDispatch()
  const { chatSetting } = useAppSelector((state) => state)
  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={CHAT_ACTION_MENU_TYPE_LIST.map((action: string) => {
        return {
          title: translate(
            `common.${action === 'none' ? 'noAction' : action}`
          ),
          rightNode: RadioOption(
            action === chatSetting.messageBubbleBehavior
          ),
          onPress: () => {
            SheetManager.hide('node-sheet')
            appDispatch(
              setChatSettingMessageBubbleBehavior(action as any)
            )
          }
        }
      })}
    />
  )
}
