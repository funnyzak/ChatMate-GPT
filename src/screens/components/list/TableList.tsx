/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Text, useToast } from '@src/components'
import { useAppSelector } from '@src/hooks'
import { Theme, useTheme } from '@src/theme'
import { haptic } from '@src/utils/haptic'
import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Icons, { iconSetting } from '../common/Icons'
/**
 * Table Row Item Props
 */
export interface TableRowProp {
  /**
   * container style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * custom row node
   */
  rowNode?: React.ReactNode
  /**
   * Row left icon
   */
  leftImg?: ImageSourcePropType
  /**
   * Row left node
   */
  leftNode?: React.ReactNode
  /**
   * Row title
   */
  title?: string
  /**
   * highlight title
   */
  highlightTitle?: boolean
  subTitle?: string
  /**
   * value
   */
  value?: string
  /**
   * tips
   */
  tips?: string
  /**
   * custom right node
   */
  rightNode?: React.ReactNode
  /**
   * Row right arrow icon
   */
  withArrow?: boolean
  /**
   * Row right arrow direction
   */
  arrowDirection?: 'left' | 'right' | 'up' | 'down'
  /**
   * custom right icon
   */
  rightImg?: ImageSourcePropType
  /**
   * Row right text
   */
  rightText?: string
  /**
   * press callback
   */
  onPress?: () => void
  /**
   * long press callback
   */
  onLongPress?: () => void
}
const TableRow: React.FC<TableRowProp> = (data: TableRowProp) => {
  const { theme } = useTheme()
  const setting = useAppSelector((state) => state.setting)
  const { arrowDirection = 'right' } = data
  const { showMessage, hideMessage } = useToast()

  const SimpleRowNode = () => {
    return (
      <View style={[rowStyles.row(theme), data.containerStyle]}>
        {data.rowNode}
      </View>
    )
  }

  const IconRowNode = () => {
    return (
      <View style={[rowStyles.row(theme), data.containerStyle]}>
        <View style={rowStyles.left(theme)}>
          <View style={rowStyles.textBox(theme)}>
            <Text
              ellipsizeMode="tail"
              style={rowStyles.title(
                theme,
                data.highlightTitle ?? false
              )}>
              {data.title}
            </Text>
            {data.subTitle && (
              <Text style={rowStyles.subTitle(theme)}>
                {data.subTitle}
              </Text>
            )}
          </View>
          {data.value && (
            <Text
              style={{
                ...theme.typography.bodyText,
                color: theme.colors.captionText,
                marginLeft: theme.spacing.large
              }}>
              {data.value}
            </Text>
          )}
        </View>
        <View style={rowStyles.right(theme)}>
          {data.rightText && (
            <Text
              style={rowStyles.rightText(theme)}
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {data.rightText}
            </Text>
          )}
          {data.rightImg && (
            <Image
              source={data.rightImg}
              style={rowStyles.rightIcon(theme)}
            />
          )}
          {data.rightNode}
          {data.withArrow && (
            <Icons.SettingArrow
              theme={theme}
              direction={arrowDirection}
            />
          )}
        </View>
      </View>
    )
  }

  const Row = data.rowNode ? SimpleRowNode() : IconRowNode()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onLongPress={() => {
        setting.hapticFeedback && haptic()
        data.onLongPress && data.onLongPress()
      }}
      onPress={() => {
        setting.hapticFeedback && haptic()
        if (data.tips) {
          showMessage({
            type: 'info',
            text1: data.title,
            text2: data.tips,
            visibilityTime: 5000,
            onPress: hideMessage
          })
        }
        data.onPress && data.onPress()
      }}
      style={rowStyles.container(theme)}>
      {data.leftNode}
      {data.leftImg && (
        <Image
          source={data.leftImg}
          style={rowStyles.leftIcon(theme)}
        />
      )}
      {Row}
    </TouchableOpacity>
  )
}
const rowStyles = {
  container: (theme: Theme): ViewStyle => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }),
  row: (theme: Theme): ViewStyle => ({
    display: 'flex',
    flexDirection: 'row',
    minHeight: 45,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderBottomWidth: theme.dimensions.defaultLineWidth,
    borderColor: theme.colors.borderLight
  }),
  left: (theme: Theme): ViewStyle => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }),
  leftIcon: (theme: Theme): ImageStyle => ({
    height: iconSetting(theme).setting.size,
    width: iconSetting(theme).setting.size
  }),
  textBox: (theme: Theme): ViewStyle => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }),
  title: (theme: Theme, highlightTitle: boolean): TextStyle => ({
    ...theme.typography.bodyText,
    color: theme.colors.regularText
  }),
  subTitle: (theme: Theme): TextStyle => ({
    ...theme.typography.labelText,
    color: theme.colors.secondaryText
  }),
  description: (theme: Theme): TextStyle => ({}),
  right: (theme: Theme): ViewStyle => ({
    display: 'flex',
    maxWidth: '55%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }),
  rightText: (theme: Theme): TextStyle => ({
    ...theme.typography.labelText,
    maxWidth: '100%',
    paddingTop: 2,
    color: theme.colors.secondaryText
  }),
  rightIcon: (theme: Theme): ImageStyle => ({
    width: iconSetting(theme).settingArrow.size,
    height: iconSetting(theme).settingArrow.size
  })
}
/**
 * TableList props
 */
export interface TableListProp {
  /**
   * container style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Table group title
   */
  title?: string
  /**
   * Table group description
   */
  description?: string
  rows?: TableRowProp[]
  children?: React.ReactNode
}

const TableList: React.FC<TableListProp> = (data: TableListProp) => {
  const { theme } = useTheme()

  const renderChildren = () => {
    if (data.children) {
      return (
        <View style={tableStyles.list(theme)}>{data.children}</View>
      )
    }
    return null
  }

  const renderRows = () => {
    return (
      <View style={tableStyles.list(theme)}>
        {data.rows &&
          data.rows!.map((row, index) => {
            return (
              <TableRow
                key={index}
                {...row}
                containerStyle={{
                  borderBottomWidth:
                    index === data.rows!.length - 1
                      ? 0
                      : theme.dimensions.defaultLineWidth
                }}
              />
            )
          })}
      </View>
    )
  }

  const renderContent = () => {
    return (
      <View
        style={[tableStyles.container(theme), data.containerStyle]}>
        {data.title && (
          <Text style={tableStyles.title(theme)}>{data.title}</Text>
        )}
        {renderRows()}
        {renderChildren()}
        {data.description && (
          <Text style={tableStyles.description(theme)}>
            {data.description}
          </Text>
        )}
      </View>
    )
  }
  return renderContent()
}
const tableStyles = {
  container: (theme: Theme): ViewStyle => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal:
      theme.dimensions.layoutContainerHorizontalMargin,
    marginVertical: theme.spacing.large
  }),
  title: (theme: Theme): TextStyle => ({
    ...theme.typography.labelText,
    paddingHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    color: theme.colors.captionText
  }),
  description: (theme: Theme): TextStyle => ({
    ...theme.typography.captionText,
    paddingHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.small
  }),
  list: (theme: Theme): ViewStyle => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.dimensions.defaultButtonRadius,
    paddingLeft: theme.spacing.medium,
    shadowColor: theme.colors.borderLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2
  })
}
export { TableList, TableRow }
