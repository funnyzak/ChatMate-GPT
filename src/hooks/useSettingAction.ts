/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-16.
 */

import {
  clearConversations,
  initConversations,
  initCurrentConversation,
  refreshCurrentConversion,
  setConverstaions,
  setICloudSyncTime,
  setRecentRemovedChatIds,
  syncICloudChatMateAction,
  updateApiKey,
  updateApiServer
} from '@src/actions'
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  ICLOUD_CHAT_DATA_PATH,
  ICloudConfig
} from '@src/config'
import {
  conversationMapToList,
  getSettingApiServer,
  logInfo,
  useQuickAction
} from '@src/helper'
import {
  getOpenAIModels,
  verifyOpenAIAPIServer
} from '@src/helper/openai'
import { unParseChatConversationsCsv } from '@src/helper/papaparse'
import { useAppDispatch, useAppSelector, useICloud } from '@src/hooks'
import { translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import { Callbacks, ICloudChatMateData } from '@src/types'
import { alert } from '@src/utils/alert'
import DocumentPicker from 'react-native-document-picker'

import { useCallback } from 'react'
// eslint-disable-next-line react-native/split-platform-components
import { Platform, Share } from 'react-native'
import RNFS from 'react-native-fs'

export const useSettingAction = () => {
  const dispatch = useAppDispatch()
  const {
    restoreFromCloud,
    cloudContainerPath,
    overwriteICloud: overwireCloud,
    iCloudAvailable
  } = useICloud(ICloudConfig.containers[0])
  const { theme } = useTheme()
  const {
    showActionButtons,
    checkApiKeyRule,
    checkApiServerRule,
    showMsg,
    tips
  } = useQuickAction()
  const { openAISetting, setting, cache, chatSetting } =
    useAppSelector((state) => state)
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: translate('brand.name'),
        url: Platform.OS !== 'ios' ? GOOGLE_PLAY_URL : APP_STORE_URL
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      showMsg({
        type: 'error',
        text2: `${translate('errors.error')}`
      })
    }
  }

  const verifyApiServer = useCallback(
    async (
      apiServer?: string,
      messageType: 'toast' | 'alert' = 'toast'
    ) => {
      if (checkApiServerRule(apiServer, messageType)) {
        try {
          await verifyOpenAIAPIServer(apiServer!)
        } catch (_error: any) {
          if (messageType === 'toast') {
            showMsg({
              type: 'error',
              text2: translate('setting.apiserver.verifyFail'),
              visibilityTime: 2000,
              onPress: () => {
                showMsg({
                  type: 'error',
                  text2: _error.message,
                  visibilityTime: 5000,
                  autoHide: true
                })
              }
            })
          } else {
            alert({
              title: translate('errors.error'),
              message: translate('setting.apiserver.verifyFail')
            })
          }
          return false
        }
        return true
      }
      return false
    },
    [setting.languageTag]
  )

  const setOpenAIApiServer = useCallback(
    async (
      apiServer?: string,
      messageType: 'toast' | 'alert' = 'toast'
    ) => {
      if (!(await verifyApiServer(apiServer, messageType)))
        return false
      dispatch(updateApiServer(apiServer!) as any)
      if (messageType === 'toast') {
        showMsg({
          type: 'success',
          text2: translate('setting.apiserver.saveSuccess')
        })
      } else {
        alert({
          title: translate('common.success'),
          message: translate('setting.apiserver.saveSuccess')
        })
      }
      return true
    },
    [setting.languageTag]
  )

  const getApiServerHost = () => {
    return getSettingApiServer(openAISetting.apiServers)
  }

  const effectOnRestartTips = useCallback(() => {
    showMsg({
      text2: translate('tips.effectOnRestart')
    })
  }, [setting.languageTag])
  const setOpenAIApiKey = useCallback(
    async (
      apiKey?: string,
      options?: {
        messageType?: 'toast' | 'alert'
        validate?: boolean
      }
    ) => {
      const { messageType = 'toast', validate = true } = options || {}
      if (validate) {
        if (checkApiKeyRule(apiKey)) {
          try {
            await getOpenAIModels(apiKey!, getApiServerHost())
          } catch (_error: any) {
            tips(_error.message, {
              mtype: messageType
            })
            return false
          }
        } else {
          tips(translate('setting.apikey.verifyFail'), {
            type: 'error',
            mtype: messageType
          })
          return false
        }
      }

      dispatch(updateApiKey(apiKey!) as any)

      tips(translate('setting.apikey.saveSuccess'), {
        mtype: messageType
      })

      return true
    },
    [setting.languageTag, openAISetting]
  )

  const resetConversations = useCallback(() => {
    const confirmOK = () => {
      dispatch(clearConversations() as any)
      dispatch(initConversations() as any)
      dispatch(initCurrentConversation() as any)
      showMsg({
        type: 'success',
        text2: `${translate('confirm.clearConversationsAndInit')}`
      })
    }

    showActionButtons({
      title: translate('common.confirm'),
      description: translate('confirm.clearConversations'),
      buttons: [
        {
          text: translate('common.cancel'),
          style: 'cancel'
        },
        {
          text: translate('common.ok'),
          style: 'destructive',
          onPress: confirmOK
        }
      ],
      cancelButtonIndex: 0,
      destructiveButtonIndex: 1
    })
  }, [setting.languageTag, theme])

  const syncICloud = async (params?: Callbacks) => {
    dispatch(
      syncICloudChatMateAction({
        ...params,
        failCallback: (_error) => {
          params?.failCallback && params?.failCallback(_error)
          showMsg({
            type: 'error',
            text2: `${translate('setting.sync.syncFail')}`
          })
        }
      }) as any
    )
  }

  const restoreDataFromICloud = async (params: {
    finallyCallback?: () => void
    failCallback?: () => void
    successCallback?: () => void
  }) => {
    restoreFromCloud<ICloudChatMateData>(
      ICLOUD_CHAT_DATA_PATH,
      async (data) => {
        if (!data || !data.data || !data.data.conversations) {
          showMsg({
            type: 'warn',
            text2: translate('setting.sync.noCloudDataSync')
          })
        } else {
          const _list = conversationMapToList(data.data.conversations)

          dispatch(setRecentRemovedChatIds([]))
          dispatch(setConverstaions(data.data.conversations) as any)
          dispatch(refreshCurrentConversion() as any)
          dispatch(setICloudSyncTime())
        }
      }
    )
      .then(() => {
        showMsg({
          type: 'success',
          text2: `${translate(
            'setting.sync.restoreFromIcloudSuccess'
          )}`
        })
        params.successCallback && params.successCallback()
        params.finallyCallback && params.finallyCallback()
      })
      .catch((error) => {
        logInfo('restoreFromCloud error', error)
        showMsg({
          type: 'error',
          text2: `${translate('setting.sync.restoreFromIcloudFail')}`
        })
        params.failCallback && params.failCallback()
        params.finallyCallback && params.finallyCallback()
      })
  }

  const overwriteICloud = async (params: {
    finallyCallback?: () => void
    failCallback?: () => void
    successCallback?: () => void
  }) => {
    overwireCloud<ICloudChatMateData>(ICLOUD_CHAT_DATA_PATH, {
      data: {
        conversations: cache.conversations
      },
      extra: {
        recentRemovedChatIds: cache.recentRemovedChatIds
      }
    })
      .then(() => {
        showMsg({
          type: 'success',
          text2: `${translate(
            'setting.sync.overwriteCloudDataSuccess'
          )}`
        })
        dispatch(setICloudSyncTime())

        params.successCallback && params.successCallback()
        params.finallyCallback && params.finallyCallback()
      })
      .catch((error) => {
        logInfo('overwireCloud error', error)
        showMsg({
          type: 'error',
          text2: `${translate('setting.sync.overwriteCloudDataFail')}`
        })
        params.failCallback && params.failCallback()
        params.finallyCallback && params.finallyCallback()
      })
  }

  const pickDirectory = async (params?: Callbacks) => {
    try {
      const _path = await DocumentPicker.pickDirectory({
        presentationStyle: 'pageSheet',
        transitionStyle: 'coverVertical'
      })
      if (_path === null) return Promise.reject('path is null')

      return {
        ..._path,
        uri: decodeURIComponent(_path.uri)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const exportData = async (params?: Callbacks) => {
    const _fail = (error: any, _showError = true) => {
      logInfo('exportData error', error)
      if (_showError)
        showMsg({
          type: 'error',
          text2: `${translate('errors.error')}`
        })
      params?.failCallback && params?.failCallback(error)
      params?.finallyCallback && params?.finallyCallback()
    }

    pickDirectory()
      .then(async (_pick: any) => {
        const tmpDataPath = `${
          _pick.uri
        }chatmate_data_${new Date().getTime()}.csv`

        logInfo('exportData', _pick.uri, tmpDataPath)
        // const tmpDataPath = `${
        //   RNFS.TemporaryDirectoryPath
        // }chatmate_data_${new Date().getTime()}.csv`
        try {
          const cvs =
            unParseChatConversationsCsv(
              conversationMapToList(cache.conversations || {})
            ) || ''

          await RNFS.write(tmpDataPath, cvs)
            .then(() => {
              logInfo('exportData success', tmpDataPath)
              showMsg({
                type: 'success',
                text2: `${translate('tips.exportDataSuccess')}`
              })

              params?.successCallback &&
                params?.successCallback(tmpDataPath)
              params?.finallyCallback && params?.finallyCallback()
            })
            .catch(_fail)
        } catch (error) {
          _fail(error)
        }
      })
      .catch((_error) => {
        _fail(_error, false)
      })
  }

  const checkAndSyncICloud = (params?: Callbacks) => {
    if (
      iCloudAvailable &&
      setting.icloudSync &&
      Platform.OS === 'ios'
    ) {
      syncICloud(params)
    }
  }

  return {
    checkAndSyncICloud,
    pickDirectory,
    exportData,
    syncICloud,
    restoreDataFromICloud,
    overwriteICloud,
    iCloudAvailable,
    checkApiKeyRule,
    effectOnRestartTips,
    cloudContainerPath,
    setOpenAIApiKey,
    verifyApiServer,
    checkApiServerRule,
    setOpenAIApiServer,
    shareApp,
    resetConversations
  }
}
