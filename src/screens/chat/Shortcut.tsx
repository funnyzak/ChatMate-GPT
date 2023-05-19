/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import { PROMPT_SOURCE_FROM_REPOSITORY } from '@src/config'
import {
  PromptShortcutInfo,
  ResourcePromptInfo,
  ResourcePromptTagType,
  ResourcePromptTagTypes,
  logInfo,
  parseResourcePrompts,
  useQuickAction
} from '@src/helper'
import { getLocale, translate } from '@src/i18n'
import {
  ROUTES,
  ShortcutScreenProps as ScreenProps
} from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import { connect } from 'react-redux'
import * as CompS from '../components'
import { useAppDispatch } from '@src/hooks'
import { fetchShortcuts } from '@src/actions'
const ShortCut = ({
  navigation,
  setting,
  cache
}: ScreenProps & {
  setting: RootState['setting']
  cache: RootState['cache']
}) => {
  const { theme } = useTheme()
  const appdispatch = useAppDispatch()
  const { showMsg, featureTips } = useQuickAction()
  const shortcuts = useMemo(
    () =>
      parseResourcePrompts(
        cache.promptShortcuts?.shortcuts as Array<ResourcePromptInfo>,
        getLocale().startsWith('zh') ? 'cn' : 'en'
      ),
    [setting.languageTag, cache.promptShortcuts?.shortcuts]
  )
  const filterShortcuts = useMemo(
    () =>
      cache.shortcutFilterSetting?.tags &&
      cache.shortcutFilterSetting?.tags.length > 0
        ? shortcuts?.filter((_v: PromptShortcutInfo) => {
            const { search, tags } = cache.shortcutFilterSetting || {}
            if (
              search &&
              search.length > 0 &&
              !_v.title.includes(search)
            )
              return false

            if (tags && tags.length > 0) {
              if (!_v.tags || _v.tags.length === 0) return false

              return tags.some((tag) => {
                return _v.tags
                  ?.map((v) => v.name)
                  .includes(tag as any)
              })
            }

            return true
          })
        : shortcuts,
    [shortcuts, cache.shortcutFilterSetting]
  )

  const filterTags = useMemo(
    () =>
      ResourcePromptTagTypes.filter((v) =>
        shortcuts?.some((v2) =>
          v2.tags
            ?.map((v3) => v3.name)
            .includes(v as ResourcePromptTagType)
        )
      ),
    [shortcuts]
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <CompS.HeaderButton
            containerStyle={{
              width: 100
            }}
            text={
              cache.shortcutFilterSetting?.tags &&
              cache.shortcutFilterSetting?.tags.length > 0
                ? `${translate('common.filter')}(${
                    cache.shortcutFilterSetting.tags.length
                  })`
                : translate('common.filter')
            }
            onLongPress={() => {
              logInfo('Long press to fetch latest shortcuts')
              showMsg({
                type: 'info',
                text2: translate('tips.fetchingLatestShortcuts')
              })
              appdispatch(
                fetchShortcuts({
                  forceUpdate: true,
                  success: (_list) => {
                    showMsg({
                      type: 'success',
                      text2: translate(
                        'tips.fetchingLatestShortcutsSuccess'
                      ).replace('{count}', _list.length.toString())
                    })
                  },
                  fail: (_err) => {
                    showMsg({
                      type: 'error',
                      text2: translate(
                        'tips.fetchingLatestShortcutsError'
                      ).replace('{err}', _err.toString())
                    })
                  }
                }) as any
              )
            }}
            onPress={() => {
              SheetManager.show('node-sheet', {
                onClose: (data: any) => {},
                payload: {
                  title: translate('common.filter'),
                  children: (
                    <CompS.ShortcutFilterPanel tags={filterTags} />
                  )
                }
              })
            }}
          />
        )
      }
    })
  }, [cache.shortcutFilterSetting?.tags, cache.featureTipsHistory])

  useEffect(() => {
    navigation.setOptions({
      title: `${translate(`router.${ROUTES.Shortcut}`)} (${
        filterShortcuts?.length ?? 0
      })`
    })
  }, [filterShortcuts])

  useEffect(() => {
    // 拉取提示词库提醒
    featureTips('fetchShortcuts')
  }, [])
  return (
    <View style={SylCommon.Layout.fill}>
      <CompS.HintsBechindComponentLabel
        text={`${translate('tips.dataFrom').replace(
          '###',
          PROMPT_SOURCE_FROM_REPOSITORY.split('/').slice(-2).join('/')
        )}`}
      />
      <CompS.ShortcutsComponent
        shortcuts={filterShortcuts}
        itemContainerStyle={{
          marginHorizontal:
            theme.dimensions.layoutContainerHorizontalMargin
        }}
      />
    </View>
  )
}

const mapStateToProps = (state: RootState) => {
  return { setting: state.setting, cache: state.cache }
}
export default connect(mapStateToProps)(ShortCut)
