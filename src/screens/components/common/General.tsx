/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Text } from '@src/components'
import { useAppSelector } from '@src/hooks'
import { Theme, useTheme } from '@src/theme'
import { haptic } from '@src/utils/haptic'
import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
/**
 * TextWithIconPress props
 */
export interface TextWithIconPressProps {
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  text?: string
  icon?: ImageSourcePropType
  iconSize?: number
  svgIcon?: React.ReactNode
  onPress?: () => void
}
const TextWithIconPress: React.FC<TextWithIconPressProps> = ({
  text,
  icon,
  iconSize = 20,
  containerStyle,
  textStyle,
  svgIcon,
  onPress
}: TextWithIconPressProps) => {
  const { theme } = useTheme()
  const setting = useAppSelector((state) => state.setting)
  const renderContent = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.textWithIconPress.container(theme),
          containerStyle
        ]}
        onPress={() => {
          setting.hapticFeedback && haptic()
          onPress && onPress()
        }}>
        {icon && (
          <Image
            source={icon}
            style={[
              styles.textWithIconPress.icon(theme),
              {
                width: iconSize,
                height: iconSize
              }
            ]}
          />
        )}
        {svgIcon}
        {text && (
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.textWithIconPress.text(theme), textStyle]}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    )
  }
  return renderContent()
}
const BorderLine = ({ width = 0.3 }: { width?: number }) => {
  const { theme } = useTheme()
  return (
    <View style={[styles.borderLine(theme), { height: width }]} />
  )
}

export const HintsBechindComponentLabel = ({
  text
}: {
  text: string
}) => {
  const { theme } = useTheme()
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        top: 25,
        left: 0
      }}>
      <Text
        numberOfLines={3}
        style={{
          textAlign: 'center',
          width: '100%',
          ...theme.typography.captionText,
          color: theme.colors.placeholderText
        }}>
        {text}
      </Text>
    </View>
  )
}
const HeaderButton = ({
  containerStyle,
  icon,
  iconNode: svg,
  onPress,
  text,
  direction = 'right',
  onLongPress,
  textColor
}: {
  direction?: 'left' | 'right'
  containerStyle?: StyleProp<ViewStyle>
  icon?: ImageSourcePropType
  iconNode?: React.ReactNode
  text?: string
  textColor?: string
  onPress?: () => void
  onLongPress?: () => void
}) => {
  const { theme } = useTheme()
  const setting = useAppSelector((state) => state.setting)
  return (
    <Pressable
      onPress={() => {
        onPress && onPress()
      }}
      disabled={!onPress && !onLongPress}
      onLongPress={onLongPress && (() => onLongPress())}
      style={[
        {
          marginLeft: direction === 'left' ? theme.spacing.small : 0,
          marginRight:
            direction === 'right' ? theme.spacing.small : 0,
          minWidth: text ? 60 : theme.dimensions.headerButtonSize,
          display: 'flex',
          alignSelf: direction === 'left' ? 'flex-start' : 'flex-end',
          flexDirection: 'row',
          justifyContent:
            direction === 'left' ? 'flex-start' : 'flex-end'
        },
        containerStyle
      ]}>
      {svg}
      {icon && (
        <Image
          source={icon}
          style={{
            width: theme.dimensions.headerButtonSize,
            height: theme.dimensions.headerButtonSize
          }}
        />
      )}
      {text && (
        <Text
          style={[
            styles.headerText(theme, textColor),
            {
              marginLeft:
                direction === 'left' ? theme.spacing.tiny : 0,
              marginRight:
                direction === 'right' ? theme.spacing.tiny : 0
            }
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  )
}
const styles = {
  headerText: (theme: Theme, textColor?: string): TextStyle => ({
    ...theme.typography.headingText,
    color: textColor ?? theme.colors.appbarIcon
  }),
  footer: (theme: Theme): ViewStyle => ({
    marginVertical: theme.spacing.extraLarge,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  footerItem: (theme: Theme): TextStyle => ({
    marginBottom: theme.spacing.small,
    ...theme.typography.captionText
  }),
  borderLine: (theme: Theme): ViewStyle => ({
    width: '100%',
    height: 0.3,
    backgroundColor: theme.colors.borderLighter
  }),
  textWithIconPress: {
    container: (theme: Theme): ViewStyle => ({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }),
    item: (theme: Theme): ViewStyle => ({
      marginRight: 0,
      flex: 1
    }),
    icon: (theme: Theme): ImageStyle => ({
      marginRight: 10,
      width: 20,
      height: 20
    }),
    text: (theme: Theme): TextStyle => ({
      ...theme.typography.bodyText,
      color: theme.colors.primaryText
    })
  }
}
const HeaderBackButton = ({ navigation }: { navigation: any }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useTheme()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton
          direction="left"
          icon={theme.assets.images.header.back}
          onPress={() => navigation.goBack()}
        />
      )
    })
  }, [navigation])
  return null
}
export {
  BorderLine,
  HeaderBackButton,
  HeaderButton,
  TextWithIconPress
}
