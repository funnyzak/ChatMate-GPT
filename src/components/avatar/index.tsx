/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Theme, useTheme } from '@src/theme'
import React, { useCallback, useRef } from 'react'
import {
  Animated,
  Image,
  Pressable,
  View,
  ViewStyle
} from 'react-native'
import FastImage, { Source } from 'react-native-fast-image'
interface IProps {
  style?: ViewStyle
  username?: string
  size?: number
  source?: Source
  onPress?: () => void
}
const AvatarComponent = ({
  username,
  size = 24,
  source,
  onPress,
  style
}: IProps) => {
  const { theme } = useTheme()
  const avatarImageScaleValue = useRef(new Animated.Value(0)).current
  const _handlePress = useCallback(() => {
    onPress && onPress()
  }, [username, onPress])
  const onAvatarImageLoadEnd = () => {
    Animated.timing(avatarImageScaleValue, {
      toValue: 1,
      duration: 300,
      delay: 5,
      useNativeDriver: true
    }).start()
  }
  const AvatarImage = () => {
    if (source) {
      return (
        <Animated.View style={{ opacity: avatarImageScaleValue }}>
          <FastImage
            source={{
              uri: source.uri,
              cache: FastImage.cacheControl.web
            }}
            onLoadEnd={onAvatarImageLoadEnd}
            onError={onAvatarImageLoadEnd}
            style={styles.avatar(theme, size)}
          />
        </Animated.View>
      )
    }
    return (
      <Image
        source={theme.assets.images.general.chatgpt}
        style={styles.avatar(theme, size)}
      />
    )
  }
  return onPress ? (
    <Pressable style={style} onPress={_handlePress}>
      <AvatarImage />
    </Pressable>
  ) : (
    <View style={style}>
      <AvatarImage />
    </View>
  )
}
const avatar = React.memo(AvatarComponent)
const styles = {
  avatar: (theme: Theme, size: number) => ({
    width: size,
    height: size,
    borderWidth: 0.3,
    borderColor: theme.colors.borderBase,
    borderRadius: size / 2
  })
}
export default avatar
