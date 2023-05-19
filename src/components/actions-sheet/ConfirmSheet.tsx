/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import Button from './Btn'
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
  SheetManager,
  SheetProps
} from 'react-native-actions-sheet'
/* usage:
  SheetManager.show('confirm-sheet', {
    onClose: (data: any) => {
      console.log('onClose', data)
      showToast(data)
    },
    payload: {
      description: '确定进行此操作吗？',
      confirmText: '确定',
      cancelText: '取消'
    }
  })
**/
const ConfirmActionSheet = (props: SheetProps) => {
  const { theme } = useTheme()
  const {
    sheetId,
    payload: {
      description,
      confirmText = translate('common.yes'),
      cancelText = translate('common.cancel')
    }
  } = props
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const buttonConfirm = (yes: boolean) => {
    console.log('buttonConfirm', yes, sheetId)
    SheetManager.hide(sheetId, {
      payload: yes,
      context: 'global'
    })
  }
  return (
    <ActionSheet
      id={sheetId}
      springOffset={50}
      onBeforeShow={(data) => console.log(data)}
      ref={actionSheetRef}
      statusBarTranslucent
      drawUnderStatusBar={true}
      useBottomSafeAreaPadding={false}
      safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.4}
      overlayColor={theme.colors.overlay}
      elevation={0}
      indicatorStyle={{
        backgroundColor: theme.colors.transparent
      }}
      containerStyle={{
        paddingTop: theme.spacing.tiny,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.colors.transparent,
        paddingBottom: theme.spacing.small
        // bottom: Platform.OS === 'ios' ? 0 : -30
      }}>
      <View
        style={[
          styles.container(theme),
          SylCommon.Card.container(theme)
        ]}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.colors.backgroundDark,
            width: '100%',
            borderRadius: 10,
            marginBottom: theme.spacing.small
          }}>
          {description && (
            <Text style={styles.text(theme)}>{description}</Text>
          )}
          <Button
            onPress={() => buttonConfirm(true)}
            color={theme.colors.danger}
            style={[
              styles.button(theme),
              {
                borderRadius: 0,
                borderTopColor: theme.colors.borderDark,
                borderTopWidth: theme.dimensions.defaultLineWidth
              }
            ]}
            title={confirmText || translate('common.yes')}
          />
        </View>
        <Button
          onPress={() => buttonConfirm(false)}
          color={theme.colors.primary}
          textStyle={{
            fontWeight: 'bold'
          }}
          style={{
            ...styles.button(theme),
            backgroundColor: theme.colors.backgroundLight
          }}
          title={cancelText || translate('common.cancel')}
        />
      </View>
    </ActionSheet>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    paddingBottom: theme.spacing.large,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.transparent
  }),
  text: (theme: Theme): TextStyle => ({
    ...theme.typography.labelText,
    width: '100%',
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingVertical: theme.spacing.large
  }),
  button: (theme: Theme): ViewStyle => ({
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.transparent
  })
}
export default ConfirmActionSheet
