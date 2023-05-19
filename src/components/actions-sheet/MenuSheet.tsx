/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { translate } from '@src/i18n'
import { SylCommon, Theme, useTheme } from '@src/theme'
import React, { useRef } from 'react'
import Button from './Btn'
import {
  Platform,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import ActionSheet, {
  ActionSheetRef,
  registerSheet,
  SheetManager,
  SheetProps
} from 'react-native-actions-sheet'
// usage:
// SheetManager.show('menu-sheet', {
//   onClose: (data: any) => {
//     console.log('onClose', data)
//   },
//   payload: {
//     actions: [
//       {
//         text: 'Menu 1',
//       },
//       {
//         text: 'Menu 2',
//       }
//     ],
//     cancelText: 'Cancel'
//   }
// })
const Sheet = (props: SheetProps) => {
  const { theme } = useTheme()
  const {
    sheetId,
    payload: {
      description,
      actions = [
        {
          text: 'Menu 3',
          color: 'red'
        }
      ],
      cancelText = translate('common.cancel')
    }
  } = props
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const hide = (actionNum?: number) => {
    SheetManager.hide(sheetId, {
      payload: actionNum,
      context: 'global'
    })
  }
  return (
    <ActionSheet
      id={sheetId}
      springOffset={50}
      animated
      onBeforeShow={(data) => console.log(data)}
      ref={actionSheetRef}
      statusBarTranslucent
      drawUnderStatusBar={true}
      useBottomSafeAreaPadding={false}
      safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.4}
      overlayColor={theme.colors.overlay}
      indicatorStyle={{
        backgroundColor: theme.colors.transparent
      }}
      elevation={0}
      containerStyle={{
        paddingTop: theme.spacing.tiny,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.colors.transparent,
        paddingBottom: theme.spacing.small
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
            backgroundColor: theme.colors.backgroundLight,
            width: '100%',
            borderRadius: 10,
            marginBottom: theme.spacing.small
            // bottom: Platform.OS === 'ios' ? 0 : -30
          }}>
          {description && (
            <Text style={styles.text(theme)}>{description}</Text>
          )}
          {actions.map(
            (
              action: { text: string; color?: string },
              index: number
            ) => {
              return (
                <Button
                  key={index}
                  onPress={() => hide(index)}
                  color={action.color ?? theme.colors.primary}
                  style={[
                    styles.button(theme),
                    {
                      borderRadius: 0,
                      borderTopColor: theme.colors.borderDark,
                      borderTopWidth:
                        (description && index === 0) || index > 0
                          ? theme.dimensions.defaultLineWidth
                          : 0
                    }
                  ]}
                  title={action.text}
                />
              )
            }
          )}
        </View>
        <Button
          onPress={() => hide()}
          color={theme.colors.secondaryText}
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
    paddingVertical: 12
  }),
  button: (theme: Theme): ViewStyle => ({
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.transparent
  })
}
registerSheet('menu-sheet', Sheet, 'global')
export default Sheet
