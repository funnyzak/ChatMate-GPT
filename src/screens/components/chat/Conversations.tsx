/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-27.
 */

import { Placeholder, Spinner } from '@src/components'
import { useQuickAction } from '@src/helper'
import { useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { RootState } from '@src/store'
import { Theme, useTheme } from '@src/theme'
import { ChatConversation } from '@src/types'
import { paginate } from '@src/utils/paging'
import { uuidv4 } from '@src/utils/uuid'
import React, { useEffect, useMemo } from 'react'
import { FlatList, StyleProp, View, ViewStyle } from 'react-native'
import { Svgs, TextWithIconPress } from '../common'
import Icons from '../common/Icons'
import {
  ChatCMenu,
  ChatContextMenu,
  ChatContextMenu2
} from '../context-menu'
interface ConversationsProps {
  containerStyle?: StyleProp<ViewStyle>
  itemContainerStyle?: StyleProp<ViewStyle>
  onRowPress?: (chatConversation: ChatConversation) => void
  canLoadMoreContent?: boolean
  conversations?: Array<ChatConversation>
  onEndReached?: () => void
  refreshControl?: React.ReactElement
  searchIndicator?: boolean
  refreshCallback?: () => void
  noMorePlaceholder?: boolean
  useFlatList?: boolean
  withNewChat?: boolean
}
const ConversationsComponent = ({
  useFlatList = true,
  containerStyle,
  onRowPress,
  itemContainerStyle,
  canLoadMoreContent,
  conversations,
  onEndReached,
  refreshControl,
  searchIndicator,
  refreshCallback,
  withNewChat = true,
  noMorePlaceholder = false
}: ConversationsProps) => {
  const { theme } = useTheme()
  const { deviceModelInfo } = useQuickAction()
  const {
    chat: { chat: currentConversation }
  } = useAppSelector((state: RootState) => state)

  const [list, setList] = React.useState<Array<ChatConversation>>()
  const [page, setPage] = React.useState(1)
  const pageSize = useMemo(
    () => (deviceModelInfo.isBigScreen ? 25 : 15),
    []
  )
  const getPageData = (_page_num: number) => {
    return paginate<ChatConversation>(
      conversations || [],
      pageSize,
      _page_num
    )
  }

  useEffect(() => {
    setPage(1)
  }, [conversations])

  useEffect(() => {
    const _page = getPageData(page)
    setList((page === 1 ? [] : list || []).concat(_page.list))
  }, [page, conversations])

  const _onEndReached = () => {
    setPage((_page: number) => _page + 1)
  }

  const onItemPress = (info: ChatConversation) => {
    if (onRowPress) onRowPress(info)
    else {
      NavigationService.navigate(ROUTES.Chat, {
        chatId: info.id
      })
    }
  }

  const renderItemRow = ({ item }: { item: ChatConversation }) =>
    !item || item === null ? null : (
      <View
        key={item.id}
        style={[
          styles.itemContainer(theme),
          itemContainerStyle,
          {
            width: '100%',
            ...(currentConversation?.id === item.id
              ? {
                  backgroundColor: theme.colors.borderDark,
                  borderRadius: theme.dimensions.borderRadius
                }
              : {})
          }
        ]}>
        <TextWithIconPress
          containerStyle={[
            {
              width: 125
            }
          ]}
          svgIcon={
            <Svgs.drawer.common name={'chatbox'} theme={theme} />
          }
          text={item.title}
          onPress={() => onItemPress(item)}
        />
        <ChatCMenu conversation={item}>
          <Svgs.drawer.common
            name={'ellipsis-horizontal'}
            theme={theme}
          />
        </ChatCMenu>
      </View>
    )
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
    <View style={styles.itemSeparator(theme)} />
  )
  const renderContent = () => {
    if (!list) {
      return <Spinner style={{ marginTop: 50 }} />
    }
    if (list.length > 0) {
      return useFlatList ? (
        <FlatList
          refreshControl={refreshControl}
          style={styles.container(theme)}
          data={list}
          renderItem={renderItemRow}
          keyExtractor={(item, index) =>
            item.id + '_' + index.toString()
          }
          onEndReached={onEndReached ? onEndReached : _onEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          indicatorStyle={theme.isDark ? 'white' : 'black'}
          numColumns={1}
          horizontal={false}
          key={'ONE COLUMN'}
          maxToRenderPerBatch={100}
          initialNumToRender={100}
          ItemSeparatorComponent={renderItemSeparator}
        />
      ) : (
        <View style={[styles.container(theme), containerStyle]}>
          {list.map((v) => renderItemRow({ item: v }))}
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
    <View style={[styles.container(theme), containerStyle]}>
      {withNewChat && (
        <TextWithIconPress
          svgIcon={<Svgs.drawer.common name={'add'} theme={theme} />}
          containerStyle={[
            styles.itemContainer(theme),
            {
              justifyContent: 'flex-start',
              marginBottom: 10,
              borderWidth: theme.dimensions.defaultLineWidth,
              borderColor: theme.colors.borderDark,
              borderRadius: theme.dimensions.borderRadius
            }
          ]}
          iconSize={20}
          text={translate('button.newChat')}
          onPress={() => {
            if (onRowPress) {
              onRowPress({
                id: uuidv4() as string
              } as ChatConversation)
            } else {
              NavigationService.navigate(ROUTES.Chat, {
                chatId: uuidv4() as string
              })
            }
          }}
        />
      )}
      {renderContent()}
    </View>
  )
}
/**
 * @description styles settings
 */
const styles = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1
  }),
  itemContainer: (theme: Theme): ViewStyle => ({
    paddingVertical: theme.spacing.tiny,
    paddingLeft: theme.spacing.small,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }),
  itemSeparator: (theme: Theme) => ({
    height: 8
  })
}
export default ConversationsComponent
