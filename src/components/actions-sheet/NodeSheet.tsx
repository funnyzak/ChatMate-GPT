/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import { translate } from '@src/i18n'
import { SylCommon, useTheme } from '@src/theme'
import { Theme } from '@src/types'
import React, { useRef } from 'react'
import {
  Platform,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import ActionSheet, {
  ActionSheetRef,
  SheetProps
} from 'react-native-actions-sheet'
const NodeSheet = (props: SheetProps) => {
  const { theme } = useTheme()
  const {
    sheetId,
    payload: { title, description, containerStyle, height, children }
  } = props
  const actionSheetRef = useRef<ActionSheetRef>(null)
  return (
    <ActionSheet
      id={sheetId}
      springOffset={50}
      overlayColor={theme.colors.overlay}
      onBeforeShow={(data) => console.log(data)}
      ref={actionSheetRef}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      useBottomSafeAreaPadding={false}
      safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
      defaultOverlayOpacity={0.4}
      elevation={0}
      indicatorStyle={{
        backgroundColor: theme.colors.placeholderText
      }}
      containerStyle={{
        paddingTop: theme.spacing.tiny,
        borderTopLeftRadius: theme.dimensions.defaultButtonRadius,
        borderTopRightRadius: theme.dimensions.defaultButtonRadius,
        paddingBottom: 0,
        backgroundColor: theme.colors.background
        // height: height ?? 'auto',
        // bottom: Platform.OS === 'android' && height ? -30 : 0
      }}>
      <View style={styles.container(theme)}>
        {title && <Text style={styles.title(theme)}>{title}</Text>}
        {description && (
          <Text style={styles.description(theme)}>{description}</Text>
        )}
        <View style={containerStyle}>{children}</View>
      </View>
    </ActionSheet>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    alignSelf: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing.large
  }),
  title: (theme: Theme): TextStyle => ({
    ...theme.typography.captionTextBold,
    paddingVertical: theme.spacing.small,
    paddingBottom: theme.spacing.tiny,
    paddingHorizontal:
      theme.dimensions.layoutContainerHorizontalMargin * 2,
    color: theme.colors.placeholderText
  }),
  description: (theme: Theme): TextStyle => ({
    ...theme.typography.captionText,
    paddingVertical: theme.spacing.small,
    paddingHorizontal:
      theme.dimensions.layoutContainerHorizontalMargin +
      theme.spacing.medium,
    color: theme.colors.placeholderText
  })
}
export default NodeSheet
