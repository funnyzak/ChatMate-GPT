/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-29.
 */

import { translate } from '@src/i18n'
import { CustomHeader, HeaderButton } from '@src/screens/components'
import { useTheme } from '@src/theme'
import { Theme } from '@src/types'
import React, { useRef } from 'react'
import { View, ViewStyle } from 'react-native'
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  registerSheet
} from 'react-native-actions-sheet'
const SubmitSheet = (props: SheetProps) => {
  const { theme } = useTheme()
  const {
    sheetId,
    payload: {
      ContentNode,
      actionTitle,
      title,
      submitAction,
      height = '95%'
    }
  } = props
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const [sheetValue, setSheetValue] = React.useState<any>(null)
  return (
    <ActionSheet
      id={sheetId}
      springOffset={50}
      overlayColor={theme.colors.overlay}
      onBeforeShow={(data) => console.log(data)}
      ref={actionSheetRef}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={false}
      useBottomSafeAreaPadding={false}
      safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
      defaultOverlayOpacity={0.4}
      elevation={0}
      onOpen={() => {}}
      keyboardHandlerEnabled={false}
      containerStyle={{
        borderTopLeftRadius: theme.dimensions.defaultButtonRadius,
        borderTopRightRadius: theme.dimensions.defaultButtonRadius,
        paddingBottom: 0,
        height,
        backgroundColor: theme.colors.background
      }}>
      <CustomHeader
        titleProps={{
          children: title
        }}
        headerLeft={
          <HeaderButton
            direction="left"
            text={translate('common.cancel')}
            onPress={() => {
              SheetManager.hide(sheetId)
            }}
          />
        }
        headerRight={
          <HeaderButton
            text={actionTitle ?? translate('common.submit')}
            direction={'right'}
            onPress={() => {
              submitAction && submitAction(sheetValue)
            }}
          />
        }
      />
      <View style={styles.container(theme)}>
        <ContentNode onChange={setSheetValue} />
      </View>
    </ActionSheet>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    alignSelf: 'center',
    paddingHorizontal:
      theme.dimensions.layoutContainerHorizontalMargin * 0.7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.large
  })
}

registerSheet('submit-sheet', SubmitSheet, 'global')

export default SubmitSheet
