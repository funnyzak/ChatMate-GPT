/**
 * Created by Leon<silenceace@gmail.com> at 2023-05-11.
 */

import { setICloudSync } from '@src/actions'
import { LoadingModal } from '@src/components'
import { useQuickAction } from '@src/helper'
import {
  useAppDispatch,
  useAppSelector,
  useSettingAction
} from '@src/hooks'
import { translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import { fromNow } from '@src/utils/date'
import React, { useState } from 'react'
import { Switch } from '../common'
import { TableList } from '../list'

export const ICloudSyncSettingGroup = () => {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const { confirmActionButton } = useQuickAction()
  const { syncICloud, restoreDataFromICloud, overwriteICloud } =
    useSettingAction()
  const { setting } = useAppSelector((state) => state)
  const [isSyncing, setIsSyncing] = useState(false)

  return (
    <>
      <LoadingModal overlay={false} visible={isSyncing} />
      <TableList
        containerStyle={{
          marginBottom: theme.spacing.small
        }}
        rows={[
          {
            title: translate('setting.sync.enableIcloudSync'),
            rightNode: (
              <Switch
                value={setting.icloudSync}
                onValueChange={(value: boolean) => {
                  dispatch(setICloudSync(value))
                }}
              />
            ),
            withArrow: false
          }
        ]}
      />
      <TableList
        rows={[
          {
            title: translate('setting.sync.syncNow'),
            rightText: setting.lastSyncTime
              ? translate('setting.sync.lastSync').replace(
                  '{time}',
                  fromNow(setting.lastSyncTime * 1000)
                )
              : translate('setting.sync.notSync'),
            withArrow: true,
            onPress: () => {
              setIsSyncing(true)
              syncICloud({
                finallyCallback: () => {
                  setIsSyncing(false)
                }
              })
            }
          },
          {
            title: translate('setting.sync.restoreFromIcloud'),
            withArrow: true,
            onPress: () => {
              confirmActionButton({
                description: translate(
                  'setting.sync.restoreFromIcloudTips'
                ),
                confirm: () => {
                  setIsSyncing(true)
                  restoreDataFromICloud({
                    finallyCallback: () => {
                      setIsSyncing(false)
                    }
                  })
                }
              })
            }
          },
          {
            title: translate('setting.sync.overwriteCloudData'),
            withArrow: true,
            onPress: () => {
              confirmActionButton({
                description: translate(
                  'setting.sync.overwriteCloudDataTips'
                ),
                confirm: () => {
                  setIsSyncing(true)
                  overwriteICloud({
                    finallyCallback: () => {
                      setIsSyncing(false)
                    }
                  })
                }
              })
            }
          }
        ]}
      />
    </>
  )
}
