/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import {
  removeApiServer,
  setApiServerUse,
  setChatSettingAlwaysNewChat,
  setChatSettingAlwaysShowPrompt,
  setChatSettingAlwaysShowSendButton,
  setChatSettingIsLoadingEarlier,
  setChatSettingShowUserAvatar,
  setChatSettingShowUserName,
  setChatSettingSteamMessage,
  setHapticFeedback,
  setMaxMessagesInContext,
  setMaxTokensInContext,
  setMaxTokensPerReply,
  setNetworkTimeout,
  setOpenLinkInApp,
  setPasteFromClipboard,
  setRenderMd,
  setShowEstimatedTokenCount,
  setShowModelName,
  setShowWordCount,
  setTemperature,
  updateApiServers
} from '@src/actions'
import { Avatar, LoadingModal, Text } from '@src/components'
import { ABOUT_US } from '@src/config'
import {
  CHANGELOG_LINK,
  FAQ_LINK,
  HELP_CUSTOM_API_SERVER_LINK,
  PRIVACY_POLICY_LINK
} from '@src/config/constants'
import {
  CHAT_ACTION_MENU_TYPE_LIST,
  ChatFontSizeRatio,
  useQuickAction
} from '@src/helper'
import {
  useAppDispatch,
  useAppSelector,
  useSettingAction
} from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { RootState } from '@src/store'
import { useTheme } from '@src/theme'
import { ApiServerInfo } from '@src/types'
import { getUrlHost } from '@src/utils'
import { fromNow } from '@src/utils/date'
import { open, sendEmail } from '@src/utils/urls'
import { truncateString, wait } from '@src/utils/utils'
import { uuidv4 } from '@src/utils/uuid'
import React, { useCallback, useMemo } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import { ShowInputSubmitSheet } from '../action-sheet'
import { NumericInput, RadioOption, Svgs, Switch } from '../common'
import Icons, { Ions, iconSetting } from '../common/Icons'
import { TableList } from '../list'
import { OpenAISettingGroup } from './SettingOpenAI'
import {
  ChatFontSizeRatioSettingOptions,
  ChatModelSettingOptions,
  ConversationOrderBySettingOptions,
  LanguageGroupSettingOptions,
  MessageBubblePressBehaviorSettingOptions,
  ThemeLightModeSettingOptions,
  ThemeNightModeSettingOptions,
  ThemeSettingOptions
} from './SettingOptions'
import { set } from 'lodash'

export const AppearanceGroupSetting = () => {
  const { theme } = useTheme()
  const { setting } = useAppSelector((state) => state)
  const themeActionSheet = useCallback(() => {
    SheetManager.show('node-sheet', {
      onClose: (data: any) => {},
      payload: {
        title: translate('action.appearanceSetting'),
        description: translate('tips.themeAuto'),
        children: <ThemeSettingOptions />
      }
    })
  }, [setting.languageTag])
  const lightModelActionSheet = useCallback(() => {
    SheetManager.show('node-sheet', {
      onClose: (data: any) => {},
      payload: {
        title: translate('action.lightModeSetting'),
        description: translate('action.lightModeSettingDescription'),
        children: <ThemeLightModeSettingOptions />
      }
    })
  }, [setting.languageTag])
  const nightModelActionSheet = useCallback(() => {
    SheetManager.show('node-sheet', {
      onClose: (data: any) => {},
      payload: {
        title: translate('action.nightModeSetting'),
        description: translate('action.nightModeSettingDescription'),
        children: <ThemeNightModeSettingOptions />
      }
    })
  }, [setting.languageTag])
  return (
    <TableList
      title={translate('setting.appearance.title')}
      // description={translate('tips.themeAuto')}
      rows={[
        {
          leftNode: <Svgs.settings.Theme theme={theme} />,
          title: translate('setting.appearance.theme'),
          rightText: translate('theme.' + setting.theme),
          withArrow: true,
          arrowDirection: 'down',
          onPress: themeActionSheet
        },
        {
          leftNode: <Svgs.settings.LightMode theme={theme} />,
          title: translate('setting.appearance.lightMode'),
          rightText: translate('theme.' + setting.themeLightMode),
          withArrow: true,
          arrowDirection: 'down',
          onPress: lightModelActionSheet
        },
        {
          leftNode: <Svgs.settings.NightMode theme={theme} />,
          title: translate('setting.appearance.nightMode'),
          rightText: translate('theme.' + setting.themeNightMode),
          withArrow: true,
          arrowDirection: 'down',
          onPress: nightModelActionSheet
        }
      ]}
    />
  )
}
export const GeneralSettingGroupSetting = () => {
  const { theme } = useTheme()
  const { setting, cache } = useAppSelector((state) => state)
  const { syncICloud, exportData } = useSettingAction()
  const [doing, setDoing] = React.useState(false)
  const syncTime = useMemo(
    () =>
      !setting.icloudSync
        ? translate('common.off')
        : setting.lastSyncTime
        ? translate('setting.sync.lastSync').replace(
            '{time}',
            fromNow(setting.lastSyncTime * 1000)
          )
        : translate('setting.sync.notSync'),
    [setting.icloudSync, setting.lastSyncTime]
  )
  return (
    <>
      <LoadingModal overlay={false} visible={doing} />
      <TableList
        title={translate('setting.info.universal')}
        rows={[
          {
            leftNode: <Svgs.settings.ChatBox theme={theme} />,
            title: translate('setting.info.chat'),
            withArrow: true,
            onPress: () =>
              NavigationService.navigate(ROUTES.SettingChat)
          },
          ...(Platform.OS === 'ios'
            ? [
                {
                  leftNode: <Svgs.settings.Cloud theme={theme} />,
                  title: translate('setting.sync.icloudSync'),
                  withArrow: true,
                  rightText: syncTime,
                  onPress: () =>
                    NavigationService.navigate(ROUTES.ICloudSync),
                  onLongPress: () => {
                    setDoing(true)
                    syncICloud({
                      finallyCallback: () => {
                        setDoing(false)
                      }
                    })
                  }
                },
                {
                  leftNode: (
                    <Svgs.settings.common
                      name={'archive'}
                      theme={theme}
                    />
                  ),
                  title: translate('setting.info.exportData'),
                  withArrow: true,
                  onPress: () => {
                    setDoing(true)
                    exportData({
                      finallyCallback: () => {
                        setDoing(false)
                      }
                    })
                  }
                }
              ]
            : []),
          {
            leftNode: <Svgs.settings.Theme theme={theme} />,
            title: translate('setting.appearance.title'),
            rightText: translate('theme.' + setting.theme),
            withArrow: true,
            onPress: () => {
              NavigationService.navigate(ROUTES.SettingTheme)
            }
          },
          {
            leftNode: <Svgs.settings.Language theme={theme} />,
            title: translate('setting.language.language'),
            rightText: translate('locale.' + setting.languageTag),
            arrowDirection: 'down',
            withArrow: true,
            onPress: () => {
              SheetManager.show('node-sheet', {
                onClose: (data: any) => {},
                payload: {
                  title: translate('action.languageSetting'),
                  description: translate(
                    'action.languageSettingDescription'
                  ),
                  children: <LanguageGroupSettingOptions />
                }
              })
            }
          }
        ]}
      />
    </>
  )
}

export const SupportSetting = () => {
  const { theme } = useTheme()
  const { shareApp } = useSettingAction()
  const { rateApp } = useQuickAction()
  return (
    <TableList
      title={translate('setting.info.support')}
      rows={[
        ...(Platform.OS === 'ios'
          ? [
              {
                leftNode: (
                  <Svgs.settings.common name="star" theme={theme} />
                ),
                title: translate('setting.info.rate'),
                withArrow: false,
                rightNode: (
                  <>
                    {Array.from({
                      length: 5
                    }).map((_, idx) => (
                      <Ions
                        key={idx}
                        name="star"
                        type="sharp"
                        theme={theme}
                        style={{
                          ...iconSetting(theme).settingArrow,
                          height:
                            theme.dimensions.headerButtonSize - 5,
                          color: theme.colors.warning,
                          marginLeft: theme.spacing.tiny
                        }}
                      />
                    ))}
                  </>
                ),
                onPress: rateApp
              }
            ]
          : []),

        {
          leftNode: <Svgs.settings.Share theme={theme} />,
          title: translate('setting.info.share'),
          withArrow: true,
          onPress: shareApp
        }
      ]}
    />
  )
}

export const ContactSetting = () => {
  const { theme } = useTheme()
  const { app } = useAppSelector((state) => state)
  const { actionSheetWeb, showMsg } = useQuickAction()
  return (
    <>
      <TableList
        title={translate('setting.about.title')}
        rows={[
          {
            leftNode: <Svgs.settings.Email theme={theme} />,
            title: translate('setting.info.feedback'),
            // rightText: ABOUT_US.email,
            withArrow: true,
            onPress: () => {
              sendEmail({
                email: ABOUT_US.email,
                subject: `${app.name} ${app.version.version}(${
                  app.version.buildId
                }) ${app.deviceInfo?.systemName} ${
                  app.deviceInfo?.systemVersion
                } ${translate('common.feedback')}`
              }).catch((e) => {
                showMsg({
                  type: 'error',
                  text2: `${translate('errors.error')}`
                })
              })
            }
          },
          {
            leftNode: <Svgs.settings.PrivacyPolicy theme={theme} />,
            title: translate('setting.info.privacyPolicy'),
            withArrow: true,
            onPress: () =>
              actionSheetWeb(PRIVACY_POLICY_LINK, {
                title: translate('router.PrivacyPolicy')
              })
          },
          // {
          //   leftNode: <Svgs.settings.Discord theme={theme} />,
          //   title: translate('common.discord'),
          //   rightText: ABOUT_US.discord.split('/').reverse()[0],
          //   withArrow: true,
          //   onPress: () => {
          //     openUrl(ABOUT_US.discord)
          //   }
          // },

          {
            leftNode: <Svgs.settings.Github theme={theme} />,
            title: translate('common.github'),
            rightText: `${ABOUT_US.github}`,
            withArrow: true,
            onPress: () =>
              NavigationService.navigate(ROUTES.WebViewer, {
                url: `https://github.com/${ABOUT_US.github}`,
                title: translate('common.github')
              })
          },
          // {
          //   leftNode: <Svgs.settings.Twitter theme={theme} />,
          //   title: translate('common.twitter'),
          //   rightText: `${ABOUT_US.twitter}`,
          //   withArrow: true,
          //   onPress: () =>
          //     NavigationService.navigate(ROUTES.WebViewer, {
          //       url: `https://twitter.com/${ABOUT_US.github}`,
          //       title: translate('common.twitter')
          //     })
          // }
          {
            leftNode: (
              <Svgs.settings.common theme={theme} name={'layers'} />
            ),
            title: translate('common.version'),
            withArrow: false,
            rightText: `${app.version.version} (${app.version.buildNumber})`,
            onPress: () =>
              actionSheetWeb(CHANGELOG_LINK, {
                title: translate('setting.info.changelog')
              })
          }
        ]}
      />
    </>
  )
}
export const AppInfoGroupSetting = () => {
  const { theme } = useTheme()
  const { actionSheetWeb } = useQuickAction()
  const { setting } = useAppSelector((state: RootState) => state)
  return (
    <TableList
      title={translate('setting.info.title')}
      rows={[
        {
          leftNode: <Svgs.settings.Hammer theme={theme} />,
          title: translate('setting.info.appSetting'),
          withArrow: true,
          onPress: () => NavigationService.navigate(ROUTES.SettingApp)
        },
        ...(Platform.OS === 'ios'
          ? [
              {
                leftNode: <Svgs.settings.Scheme theme={theme} />,
                title: translate('setting.scheme.scheme'),
                withArrow: true,
                onPress: () =>
                  NavigationService.navigate(ROUTES.URLScheme)
              }
            ]
          : []),
        {
          leftNode: <Svgs.settings.Faq theme={theme} />,
          title: translate('setting.info.help'),
          withArrow: true,
          onPress: () => {
            actionSheetWeb(FAQ_LINK, {
              title: translate('setting.info.help')
            })
          }
        }
      ]}
    />
  )
}

export const URLSchemeGroupSetting = () => {
  const { theme } = useTheme()
  const { schemeURL, copyText } = useQuickAction()
  return (
    <TableList
      title={translate('setting.scheme.title')}
      description={translate('tips.urlScheme')}
      rows={[
        {
          leftNode: (
            <Svgs.settings.common name={'open'} theme={theme} />
          ),
          title: translate('setting.scheme.openApp'),
          withArrow: false,
          subTitle: schemeURL.demoURL.openApp,
          onPress: () => {
            copyText(schemeURL.demoURL.openApp)
          }
        },
        {
          leftNode: <Svgs.settings.Add theme={theme} />,
          title: translate('setting.scheme.newChat'),
          withArrow: false,
          subTitle: schemeURL.demoURL.newChat,
          onPress: () => {
            copyText(schemeURL.demoURL.newChat)
          }
        },

        {
          leftNode: <Svgs.settings.ChatBox theme={theme} />,
          title: translate('setting.scheme.enterChat'),
          withArrow: false,
          subTitle: schemeURL.demoURL.openChat,
          onPress: () => {
            copyText(schemeURL.demoURL.openChat)
          }
        }
      ]}
    />
  )
}

export const AIModelGroupSettingTable = () => {
  const { theme } = useTheme()
  const { openAISetting } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  return (
    <TableList
      containerStyle={{
        marginBottom: theme.spacing.small
      }}
      title={translate('setting.openai.model&token')}
      rows={[
        {
          title: translate('setting.openai.chatModel'),
          rightText: openAISetting.model,
          withArrow: true,
          arrowDirection: 'down',
          leftNode: <Icons.settings.ChatModel theme={theme} />,
          onPress: () => {
            SheetManager.show('node-sheet', {
              onClose: (data: any) => {},
              payload: {
                title: translate('action.chatModelSetting'),
                description: translate(
                  'action.chatModelSettingDescription'
                ),
                children: <ChatModelSettingOptions />
              }
            })
          }
        },
        {
          title: translate('setting.openai.temperature'),
          leftNode: <Icons.settings.Temperature theme={theme} />,
          tips: translate('faq.openai.temperature'),
          rightNode: (
            <NumericInput
              value={openAISetting.temperature}
              initValue={openAISetting.temperature}
              onChange={(value: number) => {
                dispatch(setTemperature(value))
              }}
              minValue={0}
              maxValue={1}
              step={0.1}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.openai.maxMessagesInContext'),
          leftNode: <Icons.settings.Messages theme={theme} />,
          tips: translate('faq.openai.maxMessagesInContext'),
          rightNode: (
            <NumericInput
              value={openAISetting.maxMessagesInContext}
              initValue={openAISetting.maxMessagesInContext}
              onChange={(value: number) => {
                dispatch(setMaxMessagesInContext(value))
              }}
              minValue={0}
              maxValue={100}
              step={1}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.openai.maxTokensInContext'),
          leftNode: <Icons.settings.Tokens theme={theme} />,
          tips: translate('faq.openai.maxTokensInContext'),
          rightNode: (
            <NumericInput
              value={openAISetting.maxTokensInContext}
              initValue={openAISetting.maxTokensInContext}
              onChange={(value: number) => {
                dispatch(setMaxTokensInContext(value))
              }}
              minValue={24}
              maxValue={32768}
              step={512}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.openai.maxTokensPerReply'),
          tips: translate('faq.openai.maxTokensPerReply'),
          leftNode: <Icons.settings.Replay theme={theme} />,
          rightNode: (
            <NumericInput
              value={openAISetting.maxTokensPerReply}
              initValue={openAISetting.maxTokensPerReply}
              onChange={(value: number) => {
                dispatch(setMaxTokensPerReply(value))
              }}
              minValue={24}
              maxValue={32768}
              step={512}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.openai.networkTimeout'),
          tips: translate('faq.openai.networkTimeout'),
          leftNode: <Icons.settings.Network theme={theme} />,
          rightNode: (
            <NumericInput
              value={openAISetting.networkTimeout}
              initValue={openAISetting.networkTimeout}
              onChange={(value: number) => {
                dispatch(setNetworkTimeout(value) as any)
              }}
              minValue={30}
              maxValue={300}
              step={5}
            />
          ),
          withArrow: false
        },
        {
          leftNode: <Svgs.settings.User theme={theme} />,
          title: translate('setting.openai.apiIdentifier'),
          rightText:
            !openAISetting.apiIdentifier ||
            openAISetting.apiIdentifier === ''
              ? translate('placeholder.noSet')
              : openAISetting.apiIdentifier,
          withArrow: true,
          onPress: () =>
            NavigationService.navigate(ROUTES.EditChatTitle, {
              type: 'apiidentifier'
            })
        }
      ]}
    />
  )
}
export const InteractionSettingTable = () => {
  const { theme } = useTheme()
  const { setting } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  return (
    <TableList
      containerStyle={{
        marginBottom: theme.spacing.small
      }}
      title={translate('setting.info.interaction')}
      rows={[
        {
          title: translate('setting.other.hapticFeedback'),
          // leftNode: <Icons.settings.FingerPrint theme={theme} />,
          rightNode: (
            <Switch
              value={setting.hapticFeedback}
              onValueChange={(value: boolean) => {
                dispatch(setHapticFeedback(value))
              }}
            />
          ),
          withArrow: false
        }
      ]}
    />
  )
}
export const AppOtherSettingTable = () => {
  const { theme } = useTheme()
  const { setting } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  return (
    <TableList
      containerStyle={{
        marginBottom: theme.spacing.small
      }}
      title={translate('setting.other.title')}
      rows={[
        {
          title: translate('setting.info.pasteFromClipboard'),
          tips: translate('faq.setting.pasteFromClipboard'),
          rightNode: (
            <Switch
              value={setting.pasteFromClipboard}
              onValueChange={(value: boolean) => {
                dispatch(setPasteFromClipboard(value))
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.info.openLinkInApp'),
          rightNode: (
            <Switch
              value={setting.openLinkInApp}
              onValueChange={(value: boolean) => {
                dispatch(setOpenLinkInApp(value))
              }}
            />
          ),
          withArrow: false
        }
      ]}
    />
  )
}
export const ChatSettingTable = () => {
  const { theme } = useTheme()
  const { effectOnRestartTips } = useSettingAction()
  const { chatSetting, setting } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const orderByActionSheet = useCallback(() => {
    SheetManager.show('node-sheet', {
      onClose: (data: any) => {},
      payload: {
        title: translate('setting.chat.conversationOrderBy'),
        description: translate('faq.chat.conversationOrderBy'),
        children: <ConversationOrderBySettingOptions />
      }
    })
  }, [setting.languageTag])
  const messageBubbleActionSheet = useCallback(() => {
    SheetManager.show('node-sheet', {
      onClose: (data: any) => {},
      payload: {
        title: translate('setting.chat.messageBubblePress'),
        children: <MessageBubblePressBehaviorSettingOptions />
      }
    })
  }, [setting.languageTag])
  const fontSizeRatioActionSheet = useCallback(() => {
    SheetManager.show('node-sheet', {
      onClose: (data: any) => {},
      payload: {
        title: translate('setting.chat.chatFontSize'),
        children: <ChatFontSizeRatioSettingOptions />
      }
    })
  }, [setting.languageTag])
  return (
    <TableList
      containerStyle={{
        marginBottom: theme.spacing.small
      }}
      // title={translate('setting.chat.title')}
      rows={[
        {
          title: translate('setting.chat.userName'),
          withArrow: true,
          rightText: chatSetting.userName
            ? truncateString(chatSetting.userName, 20, '...')
            : translate('common.notSet'),
          onPress() {
            NavigationService.navigate(ROUTES.EditChatTitle, {
              type: 'username'
            })
          }
        },
        {
          title: translate('setting.chat.showUserName'),
          tips: translate('edit.chatUserNameDescription'),
          rightNode: (
            <Switch
              value={chatSetting.showUserName}
              onValueChange={(value: boolean) => {
                dispatch(setChatSettingShowUserName(value))
                effectOnRestartTips()
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.chat.avatarLink'),
          withArrow: true,
          rightText: !chatSetting.avatarImgUrl
            ? translate('common.notSet')
            : '',
          rightNode: chatSetting.avatarImgUrl ? (
            <Avatar source={{ uri: chatSetting.avatarImgUrl }} />
          ) : undefined,
          onPress() {
            NavigationService.navigate(ROUTES.EditChatTitle, {
              type: 'avatar'
            })
          }
        },
        {
          title: translate('setting.chat.showUserAvatar'),
          tips: translate('edit.chatAvatarLinkDescription'),
          rightNode: (
            <Switch
              value={chatSetting.showUserAvatar}
              onValueChange={(value: boolean) => {
                dispatch(setChatSettingShowUserAvatar(value))
                effectOnRestartTips()
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.chat.isLoadEarlier'),
          tips: translate('faq.chat.isLoadEarlier'),
          rightNode: (
            <Switch
              value={chatSetting.loadEarlier}
              onValueChange={(value: boolean) => {
                dispatch(setChatSettingIsLoadingEarlier(value))
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.chat.alwaysNewChat'),
          tips: translate('faq.chat.alwaysNewChat'),
          rightNode: (
            <Switch
              value={chatSetting.alwaysNewChat}
              onValueChange={(value: boolean) => {
                dispatch(setChatSettingAlwaysNewChat(value))
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.chat.alwaysShowPrompt'),
          tips: translate('faq.chat.alwaysShowPrompt'),
          rightNode: (
            <Switch
              value={chatSetting.alwaysShowPrompt}
              onValueChange={(value: boolean) => {
                dispatch(setChatSettingAlwaysShowPrompt(value))
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.chat.alwaysShowSendButton'),
          tips: translate('faq.chat.alwaysShowSendButton'),
          rightNode: (
            <Switch
              value={chatSetting.alwaysShowSend}
              onValueChange={(value: boolean) => {
                dispatch(setChatSettingAlwaysShowSendButton(value))
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.chat.chatFontSize'),
          withArrow: true,
          rightText: translate(
            `common.${
              ChatFontSizeRatio[chatSetting.fontSizeRatio] || 'normal'
            }`
          ),
          arrowDirection: 'down',
          onPress: fontSizeRatioActionSheet
        },
        {
          title: translate('setting.chat.messageBubblePress'),
          withArrow: true,
          rightText: translate(
            `common.${
              !chatSetting.messageBubbleBehavior ||
              chatSetting.messageBubbleBehavior === 'none' ||
              CHAT_ACTION_MENU_TYPE_LIST.indexOf(
                chatSetting.messageBubbleBehavior
              ) === -1
                ? 'noAction'
                : chatSetting.messageBubbleBehavior
            }`
          ),
          arrowDirection: 'down',
          onPress: messageBubbleActionSheet
        },
        {
          title: translate('setting.chat.conversationOrderBy'),
          withArrow: true,
          rightText: translate(
            `common.${chatSetting.conversationOrderBy}`
          ),
          arrowDirection: 'down',
          onPress: orderByActionSheet
        }
      ]}
    />
  )
}
export const OpenSourceTable = () => {
  const { theme } = useTheme()
  return (
    <TableList
      containerStyle={{
        marginBottom: theme.spacing.small
      }}
      title={translate('common.thanks')}
      rows={[
        {
          leftNode: <Svgs.settings.Code theme={theme} />,
          title: translate('setting.info.openSource'),
          withArrow: true,
          onPress: () => NavigationService.navigate(ROUTES.OpenSource)
        }
      ]}
    />
  )
}
export const AIRenderSettingOptions = () => {
  const { theme } = useTheme()
  const { openAISetting } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  return (
    <TableList
      containerStyle={{
        marginBottom: theme.spacing.small
      }}
      title={translate('setting.openai.render')}
      rows={[
        {
          title: translate('setting.openai.renderMd'),
          leftNode: <Icons.settings.Markdown theme={theme} />,
          tips: translate('faq.openai.renderMd'),
          rightNode: (
            <Switch
              value={openAISetting.renderMd}
              onValueChange={(value: boolean) => {
                dispatch(setRenderMd(value))
              }}
            />
          ),
          withArrow: false
        }
      ]}
    />
  )
}

export const AIOtherSettingOptions = () => {
  const { theme } = useTheme()
  const { openAISetting, chatSetting } = useAppSelector(
    (state) => state
  )
  const dispatch = useAppDispatch()
  const { effectOnRestartTips } = useSettingAction()
  return (
    <TableList
      containerStyle={{
        marginBottom: theme.spacing.small
      }}
      title={translate('setting.openai.other')}
      rows={[
        {
          title: translate('setting.chat.streamMessage'),
          leftNode: <Svgs.settings.Pulse theme={theme} />,
          tips: translate('faq.openai.streamMessage'),
          rightNode: (
            <Switch
              value={chatSetting.streamMessage}
              onValueChange={(value: boolean) => {
                dispatch(setChatSettingSteamMessage(value))
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.openai.showModelName'),
          leftNode: <Icons.settings.ShowModelName theme={theme} />,
          tips: translate('faq.openai.showModelName'),
          rightNode: (
            <Switch
              value={openAISetting.showModelName}
              onValueChange={(value: boolean) => {
                dispatch(setShowModelName(value))
                effectOnRestartTips()
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.openai.showWordCount'),
          leftNode: <Icons.settings.ShowWordCount theme={theme} />,
          tips: translate('faq.openai.showWordCount'),
          rightNode: (
            <Switch
              value={openAISetting.showWordCount}
              onValueChange={(value: boolean) => {
                dispatch(setShowWordCount(value))
                effectOnRestartTips()
              }}
            />
          ),
          withArrow: false
        },
        {
          title: translate('setting.openai.showEstimatedTokenCount'),
          tips: translate('faq.openai.showEstimatedTokenCount'),
          leftNode: (
            <Icons.settings.ShowEstimatedTokenCount theme={theme} />
          ),
          rightNode: (
            <Switch
              value={openAISetting.showEstimatedTokenCount}
              onValueChange={(value: boolean) => {
                dispatch(setShowEstimatedTokenCount(value))
                effectOnRestartTips()
              }}
            />
          ),
          withArrow: false
        }
      ]}
    />
  )
}

export const OpenAIApiServersListTable = () => {
  const { theme } = useTheme()
  const { checkApiServerRule } = useSettingAction()
  const { showActionButtons, featureTips, openUrl, showMsg } =
    useQuickAction()
  const { openAISetting, setting } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const apiServers = useMemo(
    () => openAISetting.apiServers,
    [openAISetting.apiServers]
  )

  const editApiServer = useCallback(
    (apiserver?: ApiServerInfo) => {
      ShowInputSubmitSheet({
        height: '95%',
        submitProps: {
          title: translate('setting.openai.apiServer'),
          description: translate('setting.apiserver.description'),
          learnMorePressCallback: () => {
            open(HELP_CUSTOM_API_SERVER_LINK)
          },
          inputInitialValue: apiserver?.serverHost ?? '',
          inputPlaceholder: translate(
            'setting.apiserver.placeholder'
          ),
          textInputProps: {
            inputMode: 'text',
            autoCorrect: false
          },
          submit: async (_apiserver?: string) => {
            if (await checkApiServerRule(_apiserver, 'alert')) {
              if (!apiserver) {
                apiserver = {
                  id: uuidv4() as string,
                  serverHost: _apiserver!,
                  isSystem: false,
                  use: false
                }
              }
              apiserver.serverHost = _apiserver!
              dispatch(updateApiServers([apiserver]) as any)
              SheetManager.hide('submit-sheet')
            }
          }
        }
      })
    },
    [setting.languageTag]
  )
  const showActionButtonsActionSheet = useCallback(
    (apiserver: ApiServerInfo) => {
      if (apiserver.isSystem) {
        showMsg({
          type: 'warn',
          text2: translate('setting.apiserver.systemServerCannotEdit')
        })
        return
      }
      if (Platform.OS === 'ios') {
        showActionButtons({
          title: translate('placeholder.selectAction'),
          buttons: [
            {
              text: translate('common.edit'),
              onPress: () => {
                editApiServer(apiserver)
              }
            },
            {
              text: translate('common.delete'),
              onPress: () => {
                dispatch(removeApiServer([apiserver.id]) as any)
              }
            },
            {
              text: translate('common.cancel')
            }
          ],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2
        })
      } else {
        SheetManager.show('node-sheet', {
          onClose: (data: any) => {},
          payload: {
            title: translate('placeholder.selectAction'),
            children: (
              <TableList
                containerStyle={{
                  marginVertical: theme.spacing.small
                }}
                rows={[
                  {
                    title: translate('common.edit'),
                    press: () => {
                      editApiServer(apiserver)
                    }
                  },
                  {
                    title: translate('common.delete'),
                    press: () => {
                      dispatch(removeApiServer([apiserver.id]) as any)
                    }
                  }
                ].map((item, _idx) => {
                  return {
                    ...item,
                    withArrow: true,
                    onPress: () => {
                      SheetManager.hide('node-sheet')
                      item.press && item.press()
                    }
                  }
                })}
              />
            )
          }
        })
      }
    },
    [setting.languageTag]
  )

  const ApiServerList = useCallback(
    () => (
      <TableList
        containerStyle={{
          marginBottom: theme.spacing.small
        }}
        title={translate('setting.openai.apiServer')}
        rows={apiServers.map((item: ApiServerInfo, index) => ({
          title: getUrlHost(item.serverHost),
          leftNode: <Icons.settings.Server theme={theme} />,
          rightNode: item.use ? RadioOption(item.use) : undefined,
          onPress: () => {
            featureTips('apiServerLongPress')
            dispatch(setApiServerUse(item.id) as any)
          },
          onLongPress: () => {
            showActionButtonsActionSheet(item)
          },
          withArrow: false
        }))}
      />
    ),
    [apiServers]
  )

  return (
    <>
      <TableList
        containerStyle={{
          marginBottom: theme.spacing.small
        }}
        title={translate('common.action')}
        rows={[
          {
            title: translate('button.addServer'),
            leftNode: <Icons.settings.Add theme={theme} />,
            onPress: editApiServer,
            withArrow: false
          }
        ]}
      />
      <ApiServerList />
    </>
  )
}

export const SettingsApiServers = () => {
  const AppInfo = useAppSelector((state) => state.app)
  const { theme } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center'
      }}>
      <OpenAIApiServersListTable />
    </View>
  )
}

export const Settings = () => {
  const AppInfo = useAppSelector((state) => state.app)
  const { theme } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing.extraLarge * 1.5
      }}>
      <OpenAISettingGroup />
      {/* <AppearanceGroupSetting /> */}
      <GeneralSettingGroupSetting />
      <AppInfoGroupSetting />
      <SupportSetting />
      <ContactSetting />
      <OpenSourceTable />
      {/* <SettingFooter /> */}
    </View>
  )
}
export const SettingAI = () => {
  const dispatch = useAppDispatch()
  return (
    <View
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center'
      }}>
      <AIModelGroupSettingTable />
      <AIRenderSettingOptions />
      <AIOtherSettingOptions />
    </View>
  )
}
export const SettingOther = () => {
  const dispatch = useAppDispatch()
  return (
    <View
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center'
      }}>
      <InteractionSettingTable />
      <AppOtherSettingTable />
    </View>
  )
}
export const SettingChat = () => {
  const dispatch = useAppDispatch()
  return (
    <View
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center'
      }}>
      <ChatSettingTable />
    </View>
  )
}
export const SettingFooter = () => {
  const AppInfo = useAppSelector((state) => state.app)
  const { theme } = useTheme()
  const { actionSheetWeb } = useQuickAction()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        actionSheetWeb(CHANGELOG_LINK, {
          title: translate('setting.info.changelog')
        })
      }}
      style={{
        paddingVertical: theme.spacing.large,
        paddingBottom: theme.spacing.large * 2,
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Text
        style={{
          ...theme.typography.captionText,
          // marginBottom: theme.spacing.small,
          color: theme.colors.placeholderText
        }}>
        {`${translate('brand.name')} V${AppInfo.version.version} (${
          AppInfo.version.buildNumber
        })`}
      </Text>
      {/* <Text
        style={{
          ...theme.typography.captionText,
          color: theme.colors.placeholderText
        }}>
        {' '}
        {translate('brand.slogan')}
      </Text> */}
    </TouchableOpacity>
  )
}
