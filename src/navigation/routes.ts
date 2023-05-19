/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import type { StackScreenProps } from '@react-navigation/stack'
import { Theme } from '@src/types'
export type RootStackParamList = {
  Setting: undefined
  SettingAI: undefined
  SettingApp: undefined
  SettingChat: undefined
  SettingTheme: undefined
  ApiKeyConfig: undefined
  ApiServerConfig: undefined
  PrivacyPolicy: undefined
  Shortcut: undefined
  Chat: {
    chatId?: string
  }
  EditChatTitle: {
    type:
      | 'chattitle'
      | 'username'
      | 'avatar'
      | 'chatprompt'
      | 'apiidentifier'
    data?: any
  }
  OpenSource: undefined
  URLScheme: undefined
  ApiServers: undefined
  ApiKeys: undefined
  ChatDrawer: undefined

  ICloudSync: undefined
  SideBarChat: {
    chatId?: string
  }
  WebViewer: {
    url: string
    title?: string
    addThemeParam?: boolean
    headerRightButton?: 'more' | 'refresh' | 'none'
  }
}
export type CommonScreenProps = {
  loading: boolean
  error: string | null
  success: string | null
  theme: Theme
}
export type ApiKeyConfigScreenProps = StackScreenProps<
  RootStackParamList,
  'ApiKeyConfig'
> &
  CommonScreenProps
export type ApiServerConfigScreenProps = StackScreenProps<
  RootStackParamList,
  'ApiServerConfig'
> &
  CommonScreenProps
export type SettingScreenProps = StackScreenProps<
  RootStackParamList,
  'Setting'
> &
  CommonScreenProps
export type SettingAIScreenProps = StackScreenProps<
  RootStackParamList,
  'SettingAI'
> &
  CommonScreenProps
export type EditChatTitleScreenProps = StackScreenProps<
  RootStackParamList,
  'EditChatTitle'
> &
  CommonScreenProps
export type PrivacyPolicyScreenProps = StackScreenProps<
  RootStackParamList,
  'PrivacyPolicy'
> &
  CommonScreenProps
export type ShortcutScreenProps = StackScreenProps<
  RootStackParamList,
  'Shortcut'
> &
  CommonScreenProps
export type ChatScreenProps = StackScreenProps<
  RootStackParamList,
  'Chat'
> &
  CommonScreenProps
export type ChatDrawerScreenProps = StackScreenProps<
  RootStackParamList,
  'ChatDrawer'
> &
  CommonScreenProps
export type WebViewerScreenProps = StackScreenProps<
  RootStackParamList,
  'WebViewer'
> &
  CommonScreenProps
export type OpenSourceScreenProps = StackScreenProps<
  RootStackParamList,
  'OpenSource'
> &
  CommonScreenProps
export type SettingAppScreenProps = StackScreenProps<
  RootStackParamList,
  'SettingApp'
> &
  CommonScreenProps
export type SettingChatScreenProps = StackScreenProps<
  RootStackParamList,
  'SettingChat'
> &
  CommonScreenProps

export type SideBarChatScreenProps = StackScreenProps<
  RootStackParamList,
  'SideBarChat'
> &
  CommonScreenProps
export type ApiKeysScreenProps = StackScreenProps<
  RootStackParamList,
  'ApiKeys'
> &
  CommonScreenProps
export type ApiServersScreenProps = StackScreenProps<
  RootStackParamList,
  'ApiServers'
> &
  CommonScreenProps

export type URLSchemeScreenProps = StackScreenProps<
  RootStackParamList,
  'URLScheme'
> &
  CommonScreenProps

export type ICloudSyncScreenProps = StackScreenProps<
  RootStackParamList,
  'ICloudSync'
> &
  CommonScreenProps
export type SettingThemeScreenProps = StackScreenProps<
  RootStackParamList,
  'SettingTheme'
> &
  CommonScreenProps

type k1 = keyof RootStackParamList
export const ROUTES = {
  ICloudSync: 'ICloudSync',
  SettingTheme: 'SettingTheme',
  ApiKeyConfig: 'ApiKeyConfig',
  ApiServerConfig: 'ApiServerConfig',
  OpenSource: 'OpenSource',
  EditChatTitle: 'EditChatTitle',
  Setting: 'Setting',
  SettingAI: 'SettingAI',
  SettingApp: 'SettingApp',
  PrivacyPolicy: 'PrivacyPolicy',
  Shortcut: 'Shortcut',
  Chat: 'Chat',
  SettingChat: 'SettingChat',
  ChatDrawer: 'ChatDrawer',
  ApiKeys: 'ApiKeys',
  ApiServers: 'ApiServers',
  URLScheme: 'URLScheme',
  SideBarChat: 'SideBarChat',
  WebViewer: 'WebViewer'
} as const
// see https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum
export type ROUTES = typeof ROUTES[keyof typeof ROUTES]
