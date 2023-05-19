/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-25.
 */

import { setShortcutFilterSetting } from '@src/actions'
import { Button, Placeholder, Spinner } from '@src/components'
import {
  PromptShortcutInfo,
  ResourcePromptTag,
  ResourcePromptTagColors,
  ResourcePromptTagType,
  ResourcePromptTagTypes,
  parseResourcePromptPlaceholder,
  useQuickAction
} from '@src/helper'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { Theme, useTheme } from '@src/theme'
import { paginate } from '@src/utils/paging'
import { open } from '@src/utils/urls'
import React, { useEffect, useMemo } from 'react'
import {
  FlatList,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Svgs } from '../common'
import Icons from '../common/Icons'

export const PromptCard = ({
  info,
  onCardPress,
  containerStyle,
  showButtons = false,
  fullDisplay = false,
  showBottomButton = false
}: {
  info: PromptShortcutInfo
  onCardPress?: (info: PromptShortcutInfo) => void
  containerStyle?: StyleProp<ViewStyle>
  showButtons?: boolean
  fullDisplay?: boolean
  showBottomButton?: boolean
}) => {
  const { theme } = useTheme()
  const appdispatch = useAppDispatch()
  const {
    newChat,
    deviceModelInfo,
    showPromptShortcutTips,
    copyText,
    showMsg
  } = useQuickAction()

  if (!info || info === null) return null

  const previewPress = () => {
    SheetManager.show('node-sheet', {
      onClose: (data: any) => {},
      payload: {
        children: (
          <PromptCard
            info={info}
            containerStyle={
              styles(theme).promptCard.actionSheetContainer
            }
            fullDisplay={true}
            showButtons={false}
            showBottomButton={true}
          />
        )
      }
    })
  }

  const copyPrompt = () => {
    copyText(info.prompt, translate('tips.promptCopied'))
  }

  const chatMe = () => {
    SheetManager.hide('node-sheet')
    NavigationService.navigate(
      deviceModelInfo.isBigScreen ? ROUTES.SideBarChat : ROUTES.Chat,
      {
        chatId: newChat({
          title: info.title,
          prompt: parseResourcePromptPlaceholder(info.prompt)
        }).id
      }
    )
  }

  return (
    <View key={'prompt_' + info.id}>
      <TouchableOpacity
        onPress={
          onCardPress
            ? () => onCardPress(info)
            : !fullDisplay
            ? previewPress
            : undefined
        }
        onLongPress={copyPrompt}
        activeOpacity={0.8}
        style={[styles(theme).promptCard.container, containerStyle]}>
        {showButtons && (
          <View style={styles(theme).promptCard.buttons}>
            {/* <Button
              onPress={() => previewPress()}
              type="small"
              textColor={theme.colors.secondary}
              style={{
                borderColor: theme.colors.secondary,
                marginRight: theme.spacing.small,
                backgroundColor: theme.colors.transparent
              }}>
              {translate('common.preview')}
            </Button> */}
            <Button type="small" onPress={chatMe}>
              {translate('common.chat')}
            </Button>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={info.website && fullDisplay ? 0.8 : 1}
          onPress={() => {
            if (info.website && fullDisplay) {
              open(info.website)
            }
          }}
          style={styles(theme).promptCard.titleWrapper}>
          <Text
            style={styles(theme).promptCard.title}
            lineBreakMode="tail"
            numberOfLines={fullDisplay ? 15 : 1}>
            {info.title}
          </Text>
          {info.website && fullDisplay && (
            <Svgs.common
              name="open"
              theme={theme}
              style={{
                ...styles(theme).promptCard.title,
                marginLeft: 3
              }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={styles(theme).promptCard.description}
          numberOfLines={fullDisplay ? 20 : 2}
          ellipsizeMode={'tail'}>
          {info.description}
        </Text>
        <Text
          style={styles(theme).promptCard.prompt}
          numberOfLines={fullDisplay ? 20 : 2}
          ellipsizeMode={'tail'}>
          {translate('common.prompt')}
          {translate('symbol.colon')}
          {info.prompt}
        </Text>
        {info.tags && (
          <View style={styles(theme).promptCard.tags}>
            <Icons.common
              name={'pricetag'}
              theme={theme}
              style={{
                // transform: [{ rotate: '270deg' }],
                marginRight: theme.spacing.tiny,
                color: theme.colors.secondary,
                fontSize: theme.typography.captionText.fontSize! * 1.2
              }}
            />

            {info.tags.map((_tag: ResourcePromptTag) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={_tag.name}
                onPress={() => {
                  appdispatch(
                    setShortcutFilterSetting({
                      tags: [_tag.name]
                    })
                  )
                }}>
                <Text
                  style={{
                    ...styles(theme).promptCard.tagItem
                    // color: ResourcePromptTagColors[_tag.name]
                    //   ? ResourcePromptTagColors[_tag.name]
                    //   : theme.colors.secondaryText
                  }}
                  key={_tag.name}>
                  {_tag.label}
                </Text>
              </TouchableOpacity>
            ))}
            <Icons.common
              name={'trending-up'}
              theme={theme}
              style={{
                marginHorizontal: theme.spacing.tiny,
                color: theme.colors.secondary,
                fontSize: theme.typography.captionText.fontSize! * 1.2
              }}
            />
            <Text style={styles(theme).promptCard.tagItem}>
              {info.weight}
            </Text>
          </View>
        )}
        {showBottomButton && (
          <View style={styles(theme).promptCard.bottomButtons}>
            <Button type="large" onPress={chatMe} style={{}}>
              {translate('button.chatTopic')}
            </Button>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

interface ShortcutsProps {
  containerStyle?: StyleProp<ViewStyle>
  itemContainerStyle?: StyleProp<ViewStyle>
  onRowPress?: (chatConversation: PromptShortcutInfo) => void
  canLoadMoreContent?: boolean
  shortcuts?: Array<PromptShortcutInfo>
  onEndReached?: () => void
  pageSize?: number
  refreshControl?: React.ReactElement
  searchIndicator?: boolean
  refreshCallback?: () => void
  noMorePlaceholder?: boolean
  useFlatList?: boolean
}
export const ShortcutsComponent = ({
  useFlatList = true,
  containerStyle,
  onRowPress,
  pageSize,
  itemContainerStyle,
  canLoadMoreContent,
  shortcuts,
  onEndReached,
  refreshControl,
  searchIndicator,
  refreshCallback,
  noMorePlaceholder = true
}: ShortcutsProps) => {
  const { theme } = useTheme()
  const appdispatch = useAppDispatch()
  const { newChat, deviceModelInfo, showMsg } = useQuickAction()
  const [list, setList] = React.useState<Array<PromptShortcutInfo>>()
  const [page, setPage] = React.useState(1)
  const _pageSize = useMemo(
    () => pageSize || (deviceModelInfo.isBigScreen ? 15 : 8),
    [pageSize]
  )

  const getPageData = (_p: number) => {
    return paginate<PromptShortcutInfo>(
      shortcuts || [],
      _pageSize,
      _p
    )
  }

  useEffect(() => {
    setPage(1)
  }, [shortcuts])

  useEffect(() => {
    const _page = getPageData(page)

    setList((page === 1 ? [] : list || []).concat(_page.list))
  }, [page, shortcuts])

  const _onEndReached = () => {
    setPage((_page: number) => _page + 1)
  }

  const renderFooter = () => {
    if (canLoadMoreContent) {
      return <Spinner style={{ padding: theme.spacing.large }} />
    } else if (list && list.length > 0 && noMorePlaceholder) {
      return (
        <Placeholder
          placeholderText={translate('placeholder.noMore')}
        />
      )
    }
    return null
  }
  const renderItemSeparator = () => (
    <View style={styles(theme).promptCard.separator} />
  )
  const renderContent = () => {
    if (!list) {
      return <Spinner style={{ marginTop: 50 }} />
    }
    if (list.length > 0) {
      return useFlatList ? (
        <FlatList
          refreshControl={refreshControl}
          style={styles(theme).container}
          data={list}
          renderItem={({ item }) => (
            <PromptCard
              info={{ ...item }}
              onCardPress={onRowPress}
              containerStyle={[
                styles(theme).promptCard.containerShadow,
                itemContainerStyle
              ]}
              key={item.id}
            />
          )}
          stickyHeaderHiddenOnScroll={true}
          keyExtractor={(item, index) => {
            return item.id.toString() + '_' + index.toString()
          }}
          onEndReached={onEndReached ? onEndReached : _onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          indicatorStyle={theme.isDark ? 'white' : 'black'}
          numColumns={1}
          horizontal={false}
          key={'ONE COLUMN'}
          maxToRenderPerBatch={20}
          initialNumToRender={20}
          ItemSeparatorComponent={renderItemSeparator}
        />
      ) : (
        <View style={[styles(theme).container, containerStyle]}>
          {list.map((v) =>
            PromptCard({
              info: v,
              onCardPress: onRowPress,
              containerStyle: [
                styles(theme).promptCard.containerShadow,
                itemContainerStyle
              ]
            })
          )}
        </View>
      )
    }
    if (!searchIndicator) {
      return (
        <Placeholder
          placeholderText={translate('placeholder.noResult')}
          buttonText={translate('button.reload')}
          buttonPress={refreshCallback}
        />
      )
    }
  }
  return (
    <View style={[styles(theme).container, containerStyle]}>
      {renderContent()}
    </View>
  )
}

export const ShortcutFilterPanel = ({
  containerSyle,
  tags
}: {
  containerSyle?: StyleProp<ViewStyle>
  tags: Array<string>
}) => {
  const { theme } = useTheme()
  const { cache } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  return (
    <View
      style={[styles(theme).filterPanel.container, containerSyle]}>
      {['all', ...tags].map((v: string) => {
        const isSelect =
          (cache.shortcutFilterSetting?.tags &&
            cache.shortcutFilterSetting.tags.includes(v)) ||
          (v === 'all' &&
            (!cache.shortcutFilterSetting ||
              !cache.shortcutFilterSetting.tags ||
              cache.shortcutFilterSetting.tags.length === 0))

        return (
          <TouchableOpacity
            key={v}
            activeOpacity={0.8}
            onPress={() => {
              let _tags = cache.shortcutFilterSetting?.tags || []
              _tags =
                v === 'all'
                  ? []
                  : _tags.includes(v)
                  ? _tags.filter((t) => t !== v)
                  : [..._tags, v]
              dispatch(
                setShortcutFilterSetting({
                  tags: _tags
                })
              )
            }}>
            <Text
              style={[
                styles(theme).filterPanel.item,
                {
                  backgroundColor: isSelect
                    ? ResourcePromptTagColors[
                        v as ResourcePromptTagType
                      ] || theme.colors.secondary
                    : theme.colors.transparent,
                  color: isSelect
                    ? theme.colors.white
                    : theme.colors.secondaryText
                }
              ]}>
              {translate(`tags.${v}`)}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
/**
 * @description styles settings
 */
const styles = (
  theme: Theme
): {
  container: ViewStyle
  promptCard: {
    container: ViewStyle
    containerShadow: ViewStyle
    actionSheetContainer: ViewStyle
    titleWrapper: ViewStyle
    buttons: ViewStyle
    title: TextStyle
    description: TextStyle
    prompt: TextStyle
    tags: ViewStyle
    tagItem: TextStyle
    separator: ViewStyle
    bottomButtons: ViewStyle
  }
  filterPanel: {
    container: ViewStyle
    item: TextStyle
  }
} => {
  return {
    container: {
      flex: 1,
      zIndex: 100
    },
    promptCard: {
      container: {
        position: 'relative',
        padding: theme.spacing.large,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      },
      containerShadow: {
        backgroundColor: theme.colors.surface,
        borderWidth: theme.dimensions.defaultLineWidth,
        borderColor: theme.colors.borderLight,
        borderRadius: 10,
        shadowColor: theme.colors.borderBase,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 2
      },
      actionSheetContainer: {
        paddingHorizontal:
          theme.dimensions.layoutContainerHorizontalMargin,
        backgroundColor: theme.colors.transparent,
        marginBottom: 0,
        paddingBottom: 0,
        borderWidth: 0
      },
      buttons: {
        position: 'absolute',
        zIndex: 100,
        display: 'flex',
        right: theme.spacing.large,
        top: theme.spacing.large,
        flexDirection: 'row'
      },
      titleWrapper: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      title: {
        ...theme.typography.subheadingTextBold,
        color: theme.colors.primaryText,
        marginBottom: theme.spacing.small
      },
      description: {
        ...theme.typography.bodyText,
        color: theme.colors.regularText,
        marginBottom: theme.spacing.small
      },
      prompt: {
        ...theme.typography.labelText,
        color: theme.colors.secondaryText
      },
      tags: {
        marginTop: theme.spacing.small,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      tagItem: {
        ...theme.typography.captionText,
        marginRight: theme.spacing.small
      },
      separator: {
        height: 15
      },
      bottomButtons: {
        marginTop: theme.spacing.medium,
        marginBottom: theme.spacing.small,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }
    },
    filterPanel: {
      container: {
        paddingHorizontal:
          theme.dimensions.layoutContainerHorizontalMargin,
        paddingVertical: theme.spacing.small,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
      },
      item: {
        ...theme.typography.labelText,
        paddingHorizontal: theme.spacing.small,
        paddingVertical: theme.spacing.tiny,
        margin: theme.spacing.small
        // borderRadius: theme.dimensions.borderRadius,
        // borderColor: theme.colors.tertiary,
        // borderWidth: theme.dimensions.defaultLineWidth
      }
    }
  }
}
