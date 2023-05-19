import { AppleStore_ID, GOOGLE_PLAY_URL } from '@src/config'
/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-25.
 */

import { useToast } from '@src/components'
import { getLocale, translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import {
  PromptShortcutInfo,
  newChatConversation
} from '@src/helper/chatHelper'
import {
  copyToClipboard,
  getFromClipboard
} from '@src/utils/clipboard'
import {
  // eslint-disable-next-line react-native/split-platform-components
  ActionSheetIOS,
  Alert,
  AlertType,
  Dimensions,
  Platform,
  Share,
  ShareContent
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { ToastShowParams } from 'react-native-toast-message'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import {
  setChattUserMessage,
  setCurrentConversation,
  updateConversations,
  updateFatureTipHistory
} from '@src/actions'
import { getQueryUrl, open } from '@src/utils/urls'
import {
  NewChatSchemeParams,
  OFFICIAL_SITE,
  OpenChatSchemeParams,
  URLSchemeConfig,
  URLSchemeName,
  URLSchemeType
} from '@src/config'
import QueryString from 'qs'
import { NavigationService, ROUTES } from '@src/navigation'
import { logInfo } from './logger'
import { truncateString, wait } from '@src/utils/utils'
import { PromptPlacehoderTestRule } from './openai'
import { uuidv4 } from '@src/utils/uuid'
import { alert } from '@src/utils/alert'
import { FeatureTipType } from '@src/types'
import { RootState } from '@src/store'
import OpenAIApi from '@src/api'
import dayjs from 'dayjs'
import { TTS } from './tts'
import { SheetManager } from 'react-native-actions-sheet'
import Rate, { AndroidMarket } from 'react-native-rate'
import _ from 'lodash'
import { Setting } from '@src/screens'

const TestOpenAIApiKeyRule = /^[a-zA-Z0-9-]{42,60}$/ // 42-60位字母数字横杠
const TestOpenAIApiServer = /^https?:\/\//i

export const useQuickAction = () => {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const { showMessage, hideMessage } = useToast()
  const {
    cache: { featureTipsHistory },
    app,
    setting,
    openAISetting
  } = useAppSelector((state: RootState) => state)

  const checkApiKeyRule = (
    _val?: string,
    messageType?: 'toast' | 'alert'
  ) => {
    if (!TestOpenAIApiKeyRule.test(_val || '')) {
      if (messageType !== undefined) {
        tips(translate('setting.apikey.verifyErrorFormat'), {
          type: 'error',
          mtype: messageType
        })
      }

      return false
    }
    return true
  }

  const checkApiServerRule = (
    _val?: string,
    messageType?: 'toast' | 'alert'
  ) => {
    if (!TestOpenAIApiServer.test(_val || '')) {
      if (messageType !== undefined) {
        tips(translate('setting.apiserver.verifyErrorFormat'), {
          mtype: messageType
        })
      }
      return false
    }
    return true
  }

  const copyText = (text: string, tips?: string) => {
    copyToClipboard(text)
    showMessage({
      type: 'success',
      text2:
        // translate('common.content') +
        // translate('symbol.colon') +
        // truncateString(text, 15, '...', 'end') +
        // ' ' +
        tips || translate('tips.copySuccess')
    })
  }

  const tips = (
    text: string,
    options?: {
      title?: string
      mtype?: 'toast' | 'alert'
      type?: 'success' | 'error' | 'info' | 'warn'
    }
  ) => {
    const { title, mtype = 'toast', type = 'info' } = options || {}

    if (mtype === 'toast') {
      showMessage({
        type: type,
        text1: title,
        text2: text
      })
    } else {
      alert({
        title: title || translate('common.tip'),
        message: text
      })
    }
  }

  const accountCostUsage = async ({
    apiKey,
    startDate,
    finallyFn
  }: {
    apiKey: string
    finallyFn?: () => void
    startDate?: Date
  }) => {
    if (!checkApiKeyRule(apiKey)) {
      finallyFn && finallyFn()
      throw new Error(translate('setting.apikey.verifyErrorFormat'))
    }

    try {
      const subscription =
        await OpenAIApi.account.createAccountSubscription(apiKey)

      const totalAmount = subscription.hard_limit_usd

      const now = new Date()
      let endDate = dayjs(now).endOf('day').toDate()
      let _startDate = startDate
        ? startDate
        : totalAmount > 20
        ? dayjs(now).date(1).toDate()
        : dayjs(now).subtract(3, 'month').toDate()

      const usage = await OpenAIApi.account.createAccountBillingUsage(
        {
          start_date: dayjs(_startDate).format('YYYY-MM-DD'),
          end_date: dayjs(endDate).format('YYYY-MM-DD')
        },
        apiKey
      )
      const totalUsage = usage.total_usage / 100
      const remaining = totalAmount - totalUsage

      finallyFn && finallyFn()
      return {
        data: {
          subscription,
          usage,
          startDate: _startDate,
          endDate: endDate
        },
        totalAmount: totalAmount.toFixed(2),
        totalUsage: totalUsage.toFixed(2),
        remaining: remaining.toFixed(2)
      }
    } catch (error: any) {
      logInfo('Account Cost error', error)
      finallyFn && finallyFn()

      throw new Error(
        error.name === 'AxiosError'
          ? translate('errors.accountCostFail')
          : error.message
      )
    }
  }

  const showAccountCostUsageTips = async ({
    apiKey,
    finallyFn
  }: {
    apiKey: string
    finallyFn?: () => void
  }) => {
    accountCostUsage({
      apiKey,
      finallyFn
    })
      .then((res) => {
        showMsg({
          type: 'success',
          visibilityTime: 10000,
          text1: translate('common.cost'),
          text2: translate('tips.accountCostDetail')
            .replace(
              '{startDate}',
              dayjs(res?.data.startDate).format('YYYY-MM-DD')
            )
            .replace(
              '{endDate}',
              dayjs(res?.data.endDate).format('YYYY-MM-DD')
            )
            .replace(
              '{account}',
              res?.data.subscription.account_name ?? ''
            )
            .replace('{plan}', res?.data.subscription.plan.id)
            .replace('{totalAmount}', res?.totalAmount!)
            .replace('{totalUsage}', res?.totalUsage!)
            .replace('{remaining}', res?.remaining!)
        })
      })
      .catch((err) => {
        showMsg({
          type: 'error',
          text2: err.message
        })
      })
  }

  const openUrl = (url: string) => {
    if (setting.openLinkInApp) {
      NavigationService.navigate(ROUTES.WebViewer, {
        url: url
      })
    } else {
      open(url).catch((e) => {
        showMsg({
          type: 'error',
          text2: `${translate('errors.cantOpen')} ${url}`
        })
      })
    }
  }

  const urlForNewChat = (params: NewChatSchemeParams) => {
    return getQueryUrl(URLSchemeConfig.newchat.startPrefix, params)
  }

  const urlForOpenChat = (params: OpenChatSchemeParams) => {
    return getQueryUrl(URLSchemeConfig.openchat.startPrefix, params)
  }

  const urlSchemeHandler = (
    url?: string | null
  ): string | undefined => {
    if (!url || url === null) return

    logInfo('urlSchemeHandler', url)
    // eslint-disable-next-line prefer-destructuring
    const urlScheme = url.split('://')[0]
    if (urlScheme.toLowerCase() !== URLSchemeName.toLowerCase())
      return

    const action = url.match(/^.*\/\/([^\/\?]*)/)

    if (action === null) return

    const actionName = action[1] as URLSchemeType
    const queryData = QueryString.parse(url.split('?')[1])
    logInfo('urlSchemeHandler queryData', queryData)

    switch (actionName) {
      case 'newchat':
        const _chat = newChat({
          title: queryData?.title as string,
          prompt: queryData?.prompt as string
        })
        redirectToChat(_chat.id)
        break
      case 'openchat':
        redirectToChat(queryData?.id as string)
        wait(700, () => {
          dispatch(setChattUserMessage(queryData?.say as string))
        })
        break
    }
    return url
  }

  const redirectToChat = (chatId: string) => {
    NavigationService.navigate(
      deviceModelInfo.isBigScreen ? ROUTES.SideBarChat : ROUTES.Chat,
      { chatId }
    )
  }

  /**
   * 功能提示
   * @param feature
   * @returns
   */
  const featureTips = (
    feature: FeatureTipType,
    options?: {
      visibilityTime?: number
      type?: 'toast' | 'alert'
    }
  ) => {
    const { type = 'toast', visibilityTime = 3500 } = options || {}
    logInfo('FeatureTips featureTipsHistory', featureTipsHistory)
    if (
      featureTipsHistory &&
      featureTipsHistory[feature] !== undefined &&
      featureTipsHistory[feature]! > 0
    )
      return

    if (type === 'toast') {
      showMsg({
        type: 'info',
        text2: translate(`tips.feature.${feature}`),
        visibilityTime
      })
    } else {
      alert({
        message: translate(`tips.feature.${feature}`)
      })
    }
    dispatch(updateFatureTipHistory(feature))
  }

  const modelUseCheckTips = (model: string) => {
    if (model && model.includes('gpt-4')) {
      showMsg({
        type: 'warn',
        text1: translate('common.tip'),
        text2: translate('tips.modelPermissionCheck').replace(
          '###',
          model
        )
      })
    } else if (model && model.includes('davinci')) {
    }
  }

  const showPromptShortcutTips = (info: PromptShortcutInfo) => {
    showMsg({
      type: 'info',
      text1: info.title,
      text2: `${translate('common.description')}${translate(
        'symbol.colon'
      )}${info.description}\n\n${translate(
        'common.prompt'
      )}${translate('symbol.colon')}${info.prompt}\n\n${translate(
        'common.tip'
      )}${translate('symbol.colon')}[${translate(
        'tips.clickToClose'
      )}]`,
      visibilityTime: 10000
    })
  }

  const detectPromptFromClipboard = async () => {
    const clipContent = await getFromClipboard()
    logInfo('Detect Clipboard', clipContent)
    const prompts = getPromptListFromString(clipContent)
    if (!prompts || prompts.length === 0) return

    showActionButtons({
      title: translate('common.tip'),
      description: translate('tips.detectClipboardPrompt')
        .replace('{count}', prompts.length.toString())
        .replace(
          '{prompt}',
          prompts
            .map((_v) => truncateString(_v, 20))
            .join(translate('symbol.comma'))
        ),
      buttons: [
        {
          text: translate('common.cancel'),
          type: 'cancel'
        },
        {
          text: translate('common.import'),
          onPress: () => {
            const _conversations =
              createConversationDataListFromPromptList(prompts)
            // showMsg({
            //   type: 'success',
            //   text2: translate('tips.importSuccess')
            // })
            alert({
              message: translate('tips.importSuccess').replace(
                '{count}',
                prompts.length.toString()
              )
            })
            dispatch(
              updateConversations(_conversations!, false) as any
            )
          }
        }
      ],
      cancelButtonIndex: 0
    })
  }

  const getPromptListFromString = (
    content?: string
  ): string[] | undefined => {
    if (content && content.length > 0) {
      return content.split('\n').filter((item) => {
        return (
          item &&
          item.trim().length > 0 &&
          PromptPlacehoderTestRule.test(item) &&
          item.length < 700
        )
      })
    }
    return undefined
  }

  const createConversationDataListFromPromptList = (
    list: string[]
  ) => {
    if (!list || list.length === 0) return

    const _uuid = uuidv4() as string
    return list.map((item, _idx) => {
      return newChatConversation({
        prompt: item,
        title: truncateString(item, 20, '...', 'end'),
        id: _uuid + _idx.toString()
      })
    })
  }

  const newChat = (props?: { title?: string; prompt?: string }) => {
    const _chat = newChatConversation(props)
    dispatch(setCurrentConversation(_chat) as any)
    showMessage({
      type: 'success',
      text2: `${translate('common.create')} ${translate(
        'common.success'
      ).toLowerCase()} ${translate('symbol.period')}`
    })
    return _chat
  }

  const share = async ({ ...rest }: ShareContent) => {
    try {
      const result = await Share.share({
        ...rest
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      showMessage({
        type: 'error',
        text2: `${translate('errors.error')}`
      })
    }
  }

  const model = DeviceInfo.getModel()
  const isIOS = Platform.OS === 'ios'
  const isIphone = isIOS && model.includes('iPhone')
  const isIPad = isIOS && model.includes('iPad')
  const isAndroid = Platform.OS === 'android'
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const isBigScreen = isIPad || screenWidth >= 700

  const deviceModelInfo = {
    isIOS,
    isAndroid,
    isIPad,
    isIphone,
    isBigScreen,
    screenHeight,
    screenWidth,
    model
  }

  const showModelPrompt = ({
    title,
    description,
    buttons,
    cancelHandler,
    ...rest
  }: {
    title: string
    description?: string
    buttons: any[]
    type?: AlertType
    defaultValue?: string
    options?: {
      [key: string]: any
    }
    cancelHandler?: () => void
  }) => {
    if (Platform.OS === 'ios') {
      Alert.prompt(
        title ?? translate('brand.name'),
        description,
        buttons &&
          buttons
            .map((button) => {
              return {
                text: button.text,
                onPress: button.onPress,
                style: button.style
              }
            })
            .concat([
              {
                text: translate('common.cancel'),
                style: 'cancel'
              } as any
            ]),
        rest.type ?? 'plain-text',
        rest.defaultValue ?? '',
        'default',
        {
          userInterfaceStyle: theme.isDark ? 'dark' : 'light',
          onDismiss: () => {
            cancelHandler && cancelHandler()
          },
          ...rest.options
        }
      )
    } else {
      // Android
    }
  }

  const confirmActionButton = async ({
    title,
    description,
    confirm
  }: {
    title?: string
    description?: string
    confirm: () => void
  }) => {
    showActionButtons({
      title,
      description,
      way: 'alert',
      buttons: [
        {
          text: translate('common.cancel'),
          style: 'cancel'
        },
        {
          text: translate('common.confirm'),
          onPress: confirm
        }
      ],
      cancelButtonIndex: 0
    })
  }

  const showActionButtons = async ({
    title,
    description,
    buttons,
    way,
    options,
    cancelButtonIndex,
    destructiveButtonIndex,
    cancelHandler
  }: {
    title?: string
    description?: string
    way?: 'alert' | 'actionSheet'
    buttons: any[]
    options?: {
      [key: string]: any
    }
    cancelButtonIndex?: number
    destructiveButtonIndex?: number
    cancelHandler?: () => void
  }) => {
    if (deviceModelInfo.isIphone && (!way || way === 'actionSheet')) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title,
          message: description,
          destructiveButtonIndex,
          options: buttons.map((button) => button.text),
          cancelButtonIndex,
          userInterfaceStyle: theme.isDark ? 'dark' : 'light'
        },
        (buttonIndex: number) => {
          if (buttonIndex === cancelButtonIndex) {
            cancelHandler && cancelHandler()
          } else {
            buttons[buttonIndex].onPress &&
              buttons[buttonIndex].onPress()
          }
        }
      )
    } else {
      Alert.alert(
        title || translate('common.tip'),
        description,
        buttons.map((button) => ({
          text: button.text,
          onPress: button.onPress,
          style: button.style
        })),
        options
      )
    }
  }

  const underDevelopment = () => {
    showMsg({
      type: 'info',
      text1: Array.from({ length: 7 }, () => '👨🏻‍💻').join(' '),
      text2: translate('tips.underDevelopment')
    })
  }
  const showMsg = ({
    copyError = true,
    ...props
  }: ToastShowParams & {
    copyError?: boolean
  }) => {
    const _props = {
      visibilityTime: 3000,
      type: 'info',
      ...props
    }
    showMessage({
      ..._props,
      onPress: () => {
        if (copyError && _props.text2 && _props.type === 'error') {
          copyText(_props.text2)
        } else {
          // hideMessage()
          _props.onPress && _props.onPress()
        }
      }
    })
  }
  const checkIsSetAPIKey = (
    redirectSettingScreen?: boolean,
    hideCallback?: () => void
  ) => {
    const _redirectSettingScreen = () => {
      redirectSettingScreen &&
        NavigationService.navigate(`${ROUTES.ApiKeyConfig}`)
    }
    if (!openAISetting.apiKey || openAISetting.apiKey === '') {
      showMsg({
        type: 'warn',
        text2: translate('errors.setApiKey'),
        visibilityTime: 1500,
        onPress: _redirectSettingScreen,
        onHide: () => {
          hideCallback && hideCallback()
          _redirectSettingScreen()
        }
      })
      return false
    }
    return true
  }

  const speech = (text?: string) => {
    try {
      if (!text || text === null || text.length === 0) return

      TTS.speech(text)
    } catch (_error) {
      logInfo('TTS.speech Error', _error)
      showMsg({
        type: 'error',
        text2: translate('errors.speech')
      })
    }
  }

  const actionSheetWeb = (
    url: string,
    options?: {
      title?: string
      isSetAppParams?: boolean
    }
  ) => {
    const { isSetAppParams = true } = options || {}

    const _url = isSetAppParams
      ? getQueryUrl(url, {
          cm_theme: theme.name,
          cm_lang: getLocale()
        })
      : url

    SheetManager.show('web-sheet', {
      onClose: (data: any) => {},
      payload: {
        title: options?.title,
        url: _url
      }
    })
  }

  const rateApp = (
    options?: {
      AppleAppID?: string
      GooglePackageName?: string
      AmazonPackageName?: string
      OtherAndroidURL?: string
      preferredAndroidMarket?: AndroidMarket
      preferInApp?: boolean
      openAppStoreIfInAppFails?: boolean
      fallbackPlatformURL?: string
    },
    callback?: (success: boolean, errorMessage: string) => void
  ) => {
    callback = callback
      ? callback
      : (success, errorMessage) => {
          if (success) {
            logInfo('RateApp Success')
            // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
          }
          if (errorMessage) {
            logInfo('RateApp Error', errorMessage)
            showMsg({
              type: 'error',
              text2: translate('errors.error')
            })
          }
        }

    const _options = _.mergeWith(
      {
        AppleAppID: AppleStore_ID,
        AmazonPackageName: app.deviceInfo?.bundleId,
        GooglePackageName: app.deviceInfo?.bundleId,
        preferredAndroidMarket: AndroidMarket.Google,
        preferInApp: false,
        openAppStoreIfInAppFails: true,
        fallbackPlatformURL: OFFICIAL_SITE
      },
      options
    )
    logInfo('RateApp Options', _options)

    Rate.rate(_options, callback)
  }
  return {
    rateApp,
    copyText,
    actionSheetWeb,
    speech,
    showModelPrompt,
    schemeURL: {
      urlForNewChat,
      urlForOpenChat,
      handler: urlSchemeHandler,
      demoURL: {
        openChat: urlForOpenChat(URLSchemeConfig.openchat.demoParams),
        newChat: urlForNewChat(URLSchemeConfig.newchat.demoParams),
        openApp: 'chatmate://'
      }
    },
    checkIsSetAPIKey,
    openUrl,
    tips,
    accountCostUsage,
    detectShortcut: getPromptListFromString,
    showMessage,
    newChat,
    redirectToChat,
    underDevelopment,
    checkApiServerRule,
    checkApiKeyRule,
    showPromptShortcutTips,
    confirmActionButton,
    showMsg,
    showActionButtons,
    featureTips,
    deviceModelInfo,
    showAccountCostUsageTips,
    modelUsePermissionTips: modelUseCheckTips,
    createConversationDataListFromPromptList,
    getPromptListFromString,
    detectPromptFromClipboard,
    share
  }
}
