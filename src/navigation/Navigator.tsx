/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRefWithCurrent
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ToastProvider } from '@src/components/toast'
import {
  TTS,
  getSettingApiServer,
  iCloudHelperAPI,
  logInfo,
  useQuickAction
} from '@src/helper'
import {
  useAppDispatch,
  useAppSelector,
  useSettingAction
} from '@src/hooks'
import OpenAIApi from '@src/api'
import {
  LanguageTagType,
  changeLocale,
  getLocale,
  translate
} from '@src/i18n'
import * as Screens from '@src/screens'
import { SNStatusBar } from '@src/screens/components'
import { RootState, store } from '@src/store'
import { Theme, useTheme } from '@src/theme'
import { changeDayJsLocale } from '@src/utils/date'
import { wait } from '@src/utils/utils'
import React, { useEffect, useRef } from 'react'
import { AppState, Linking } from 'react-native'
import { SheetProvider } from 'react-native-actions-sheet'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import '../components/actions-sheet'
import NavigationService from './NavigationService'
import { defaultScreenOptions as _defaultScreenOptions } from './ScreenHelper'
import { ROUTES, RootStackParamList } from './routes'
import {
  fetchShortcuts,
  initConversations,
  initCurrentConversation,
  syncICloudChatMateAction,
  updateApiServers
} from '@src/actions'
import { ApiServersInitData, ICloudConfig } from '@src/config'
import { runAsyncWithouthError } from '@src/utils/utils'

const resetLocales = (locale: LanguageTagType) => {
  changeLocale(locale)
  changeDayJsLocale(getLocale())
}
const defaultScreenOptions = (theme: Theme) => {
  return _defaultScreenOptions(theme, {})
}
const StackNavigator = createStackNavigator<RootStackParamList>()
export const AppNavigationContainer = () => {
  const appState = useRef(AppState.currentState)
  const { checkAndSyncICloud } = useSettingAction()
  const {
    setting: { languageTag, pasteFromClipboard, icloudSync },
    openAISetting
  } = useAppSelector((state: RootState) => state)
  const { deviceModelInfo, schemeURL, detectPromptFromClipboard } =
    useQuickAction()
  const { theme } = useTheme()
  const dispatch = useAppDispatch()

  // App Lanuch Event
  useEffect(() => {
    // 设置语言
    resetLocales(store.getState().setting.languageTag)

    // 延迟300毫秒隐藏启动屏幕，防止白屏
    wait(300, () => {
      SplashScreen.hide()
    })

    // 初始化数据
    const initData = async () => {
      // 初始化iCloud
      await iCloudHelperAPI.init(ICloudConfig.containers[0])

      if (icloudSync && iCloudHelperAPI.iCloudAvailable) {
        runAsyncWithouthError(
          dispatch(
            syncICloudChatMateAction({
              finallyCallback: () => {
                dispatch(initConversations() as any)
                dispatch(initCurrentConversation() as any)
              }
            }) as any
          )
        )
      } else {
        // Init Conversation
        dispatch(initConversations() as any)
        dispatch(initCurrentConversation() as any)
      }
    }

    wait(700, initData)

    // 初始化设置 API Key 和 API 服务器
    if (
      !openAISetting.apiServers ||
      openAISetting.apiServers.length === 0
    ) {
      dispatch(updateApiServers(ApiServersInitData) as any)
    }

    // 优先使用用户设置的API Key
    if (openAISetting.apiKey) {
      logInfo('Use user setting api key...', openAISetting.apiKey)
      OpenAIApi.setApiKey(openAISetting.apiKey)
    }
    // 设置API服务器
    if (openAISetting.apiServers) {
      OpenAIApi.setApiBasePath(
        getSettingApiServer(openAISetting.apiServers)
      )
    }
    // 设置网络超时
    if (openAISetting.networkTimeout) {
      OpenAIApi.setTimeout(openAISetting.networkTimeout)
    }

    // 设置TTS
    TTS.setLanguage(getLocale() as LanguageTagType)

    wait(1000, () => {
      // 拉取prompt列表
      logInfo('Check to fetch shortcuts...')
      dispatch(fetchShortcuts() as any)
    })

    // 检测是否有URL Scheme 或者剪切板内容
    NavigationService.waitForNavigationToBeReady().then(async () => {
      const _url = await Linking.getInitialURL()
      if (_url && _url !== null) {
        schemeURL.handler(_url)
      } else if (pasteFromClipboard) {
        detectPromptFromClipboard()
      }
    })

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          logInfo(
            'App has come to the foreground!',
            'checkAndSyncICloud'
          )
          checkAndSyncICloud()
        }

        appState.current = nextAppState
        logInfo('AppState', appState.current)
      }
    )
    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    resetLocales(languageTag)
  }, [languageTag])

  return (
    <SafeAreaProvider
      style={{ backgroundColor: theme.colors.background }}>
      <ToastProvider>
        <SheetProvider>
          <NavigationContainer
            ref={(
              navigatorRef: NavigationContainerRefWithCurrent<RootStackParamList>
            ) => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }}
            theme={{
              dark: theme.name === 'dark',
              colors: {
                ...DefaultTheme.colors,
                background: theme.colors.background
              }
            }}
            documentTitle={{
              formatter: (options, route) =>
                `${options?.title ?? route?.name}`
            }}>
            <SNStatusBar />
            <StackNavigator.Navigator>
              {deviceModelInfo.isBigScreen ? (
                <StackNavigator.Screen
                  name={ROUTES.SideBarChat}
                  component={Screens.SideBarChat}
                  options={({ route, navigation }) => ({
                    ...defaultScreenOptions(theme),
                    headerBackground: undefined,
                    headerShown: false
                  })}
                />
              ) : (
                <StackNavigator.Screen
                  name={ROUTES.ChatDrawer}
                  component={Screens.ChatDrawer}
                  options={({ route, navigation }) => ({
                    ...defaultScreenOptions(theme),
                    headerBackground: undefined,
                    headerShown: false
                  })}
                />
              )}
              <StackNavigator.Screen
                name={ROUTES.Setting}
                component={Screens.Setting}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.Setting}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.ICloudSync}
                component={Screens.ICloudSync}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.ICloudSync}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.ApiKeyConfig}
                component={Screens.ApiKeyConfig}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.ApiKeyConfig}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.ApiServers}
                component={Screens.ApiServers}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.ApiServers}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />

              <StackNavigator.Screen
                name={ROUTES.SettingAI}
                component={Screens.SettingAI}
                options={({ route, navigation }) => ({
                  // animationTypeForReplace: 'push',
                  // animation: 'slide_from_right',
                  title: translate(`router.${ROUTES.SettingAI}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.SettingApp}
                component={Screens.SettingApp}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.SettingApp}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.SettingTheme}
                component={Screens.SettingTheme}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.SettingTheme}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.SettingChat}
                component={Screens.SettingChat}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.SettingChat}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.ApiServerConfig}
                component={Screens.ApiServerConfig}
                options={({ route, navigation }) => ({
                  title: translate(
                    `router.${ROUTES.ApiServerConfig}`
                  ),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.PrivacyPolicy}
                component={Screens.PrivacyPolicy}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.PrivacyPolicy}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.EditChatTitle}
                component={Screens.EditChatTitle}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.EditChatTitle}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.Shortcut}
                component={Screens.Shortcut}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.Shortcut}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.URLScheme}
                component={Screens.URLScheme}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.URLScheme}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.ApiKeys}
                component={Screens.ApiKeys}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.ApiKeys}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />

              <StackNavigator.Screen
                name={ROUTES.WebViewer}
                component={Screens.WebViewer}
                options={({ route, navigation }) => ({
                  // presentation: 'modal',
                  title: translate(`router.${ROUTES.WebViewer}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
              <StackNavigator.Screen
                name={ROUTES.OpenSource}
                component={Screens.OpenSource}
                options={({ route, navigation }) => ({
                  title: translate(`router.${ROUTES.OpenSource}`),
                  ...defaultScreenOptions(theme),
                  headerShown: true
                })}
              />
            </StackNavigator.Navigator>
          </NavigationContainer>
        </SheetProvider>
      </ToastProvider>
    </SafeAreaProvider>
  )
}
