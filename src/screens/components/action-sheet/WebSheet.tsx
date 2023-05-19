/**
 * Created by Leon<silenceace@gmail.com> at 2023-05-06.
 */

import { Spinner } from '@src/components'
import { translate } from '@src/i18n'
import { CustomHeader, HeaderButton } from '@src/screens/components'
import { SylCommon, useTheme } from '@src/theme'
import { Theme } from '@src/types'
import React, { useRef } from 'react'
import { View, ViewStyle } from 'react-native'
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  registerSheet
} from 'react-native-actions-sheet'
import WebView from 'react-native-webview'
import Icons from '../common/Icons'
const WebSheet = (props: SheetProps) => {
  const { theme } = useTheme()
  const {
    sheetId,
    payload: { url, title }
  } = props
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const [webTitle, setWebTitle] = React.useState<string>(title)
  const webViewRef = useRef<WebView>(null)
  const [loading, setLoading] = React.useState(true)
  return (
    <ActionSheet
      id={sheetId}
      springOffset={200}
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
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.dimensions.defaultButtonRadius,
        borderTopRightRadius: theme.dimensions.defaultButtonRadius,
        paddingBottom: 0,
        height: '95%'
      }}>
      <CustomHeader
        titleProps={{
          children: webTitle
        }}
        headerLeft={
          <HeaderButton
            direction="left"
            iconNode={<Icons.headers.Close theme={theme} />}
            onPress={() => {
              SheetManager.hide(sheetId)
            }}
          />
        }
      />
      <View style={styles.container(theme)}>
        {loading && (
          <Spinner
            text={translate('placeholder.loading')}
            style={SylCommon.Layout.fill}
            mask={false}
          />
        )}
        <WebView
          style={{
            backgroundColor: 'transparent'
          }}
          containerStyle={{
            backgroundColor: 'transparent'
          }}
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ uri: url }}
          onLoad={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            setLoading(false)
            setWebTitle(translate('errors.error'))
          }}
          onLoadEnd={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            setLoading(false)
            if (webTitle === undefined) {
              setWebTitle(nativeEvent.title)
            }
          }}
        />
      </View>
    </ActionSheet>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1
  })
}

registerSheet('web-sheet', WebSheet, 'global')

export default WebSheet
