/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-03.
 */

import { getSettingApiServer, useQuickAction } from '@src/helper'
import { useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { useTheme } from '@src/theme'
import { getUrlHost } from '@src/utils'
import React from 'react'
import { Svgs } from '../common'
import { TableList } from '../list'
export const OpenAISettingGroup = () => {
  const { theme } = useTheme()
  const { featureTips, showAccountCostUsageTips, showMsg } =
    useQuickAction()
  const { openAISetting } = useAppSelector((state) => state)

  return (
    <TableList
      title={translate('setting.openai.title')}
      rows={[
        {
          leftNode: <Svgs.settings.Key theme={theme} />,
          title: translate('setting.openai.apiKey'),
          rightText:
            !openAISetting.apiKey || openAISetting.apiKey === ''
              ? translate('placeholder.noSet')
              : openAISetting.apiKey,
          withArrow: true,
          onLongPress: () => {
            if (
              !openAISetting.apiKey ||
              openAISetting.apiKey === ''
            ) {
              showMsg({
                type: 'warn',
                text2: translate('errors.setApiKey')
              })
            } else {
              showMsg({
                type: 'info',
                text2: translate('tips.accountCostQueryingTips')
              })
              showAccountCostUsageTips({
                apiKey: openAISetting.apiKey
              })
            }
          },
          onPress: () => {
            featureTips('apiKeyTableRowLongPress')
            NavigationService.navigate(ROUTES.ApiKeyConfig)
            // SheetManager.show('submit-sheet', {
            //   onClose: (data: any) => {},
            //   payload: {
            //     inputSubmitProps: {
            //       title: translate('setting.openai.apiKey'),
            //       description: translate(
            //         'setting.apikey.description'
            //       ),
            //       learnMorePressCallback: () => {
            //         openUrl(HELP_GET_API_KEY_LINK)
            //       },
            //       inputInitialValue: openAISetting.apiKey,
            //       inputPlaceholder: translate(
            //         'setting.apikey.placeholder'
            //       ),
            //       textInputProps: {
            //         inputMode: 'text'
            //       },
            //       textInputType: 'password',
            //       submit: async (key?: string) => {
            //         if (await setOpenAIApiKey(key, 'alert')) {
            //           SheetManager.hide('submit-sheet')
            //         }
            //       }
            //     }
            //   }
            // })
          }
        },
        {
          leftNode: <Svgs.settings.Server theme={theme} />,
          title: translate('setting.openai.apiServer'),
          rightText: getUrlHost(
            getSettingApiServer(openAISetting.apiServers)
          ),
          withArrow: true,
          onPress: () => NavigationService.navigate(ROUTES.ApiServers)
        },
        {
          leftNode: <Svgs.settings.ChatModel theme={theme} />,
          title: translate('setting.openai.morePersonality'),
          withArrow: true,
          rightText: openAISetting.model,
          onPress: () => NavigationService.navigate(ROUTES.SettingAI)
        }
      ]}
    />
  )
}
