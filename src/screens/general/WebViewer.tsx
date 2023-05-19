/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import { Spinner } from '@src/components'
import { useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { WebViewerScreenProps as ScreenProps } from '@src/navigation/routes'
import { SylCommon, useTheme } from '@src/theme'
import { getQueryUrl } from '@src/utils/urls'
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
// eslint-disable-next-line react-native/split-platform-components
import { useQuickAction } from '@src/helper'
import { WebView } from 'react-native-webview'
import { HeaderButton } from '../components'
import Icons from '../components/common/Icons'
const WebViewer = ({ route, navigation }: ScreenProps) => {
  const { theme } = useTheme()
  const { setting } = useAppSelector((state) => state)
  const [title, setTitle] = useState<string>('')
  const webViewRef = useRef<WebView>(null)
  const [loading, setLoading] = React.useState(true)
  const { showActionButtons, copyText, share, openUrl } =
    useQuickAction()
  const {
    url,
    addThemeParam = true,
    headerRightButton = 'more'
  } = route.params || {}
  const webUrl = useMemo(() => {
    return getQueryUrl(
      !url.startsWith('http') ? `https://${url}` : url,
      addThemeParam
        ? {
            language: setting.languageTag,
            theme: theme.name
          }
        : {}
    )
  }, [route])
  useEffect(() => {
    if (loading) {
      navigation.setOptions({
        // title: translate('placeholder.loading')
        title: ''
      })
    }
  })

  const refreshPage = () => {
    setLoading(true)
    webViewRef.current?.reload()
  }

  const onMoreHandle = () => {
    showActionButtons({
      title: translate('action.chooseAction'),
      buttons: [
        {
          text: translate('action.refreshPage'),
          onPress: refreshPage
        },
        {
          text: translate('action.openInBrowser'),
          onPress: () => {
            openUrl(webUrl)
          }
        },
        {
          text: translate('action.copyUrl'),
          onPress: () => {
            copyText(webUrl)
          }
        },
        {
          text: translate('action.share'),
          onPress: () => {
            share({
              title,
              url: webUrl
            })
          }
        },
        {
          text: translate('common.cancel')
        }
      ],
      cancelButtonIndex: 4
    })
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton
          direction="left"
          iconNode={<Icons.headers.Close theme={theme} />}
          onPress={() => {
            navigation.goBack()
          }}
        />
      ),
      headerRight: () =>
        headerRightButton === 'more' ? (
          <HeaderButton
            iconNode={<Icons.headers.More theme={theme} />}
            onPress={onMoreHandle}
          />
        ) : headerRightButton === 'refresh' ? (
          <HeaderButton
            iconNode={
              <Icons.headers.Ionicons name="refresh" theme={theme} />
            }
            onPress={refreshPage}
          />
        ) : null
    })
  }, [navigation, loading]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {loading && (
        <Spinner
          text={translate('placeholder.loading')}
          style={SylCommon.Layout.fill}
          mask={false}
        />
      )}
      {/* {!loading && (
        <View
          style={{
            top: -30
          }}>
          <HintsBechindComponentLabel
            text={`此网页由 ${getUrlHost(webUrl)} 提供`}
          />
        </View>
      )} */}
      <WebView
        style={{
          backgroundColor: 'transparent'
        }}
        containerStyle={{
          backgroundColor: 'transparent'
        }}
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ uri: webUrl }}
        onLoad={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          setLoading(false)
          navigation.setOptions({ title: translate('errors.error') })
        }}
        onLoadEnd={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          setLoading(false)
          const _title =
            route.params.title === undefined
              ? nativeEvent.title
              : route.params.title
          navigation.setOptions({
            title: _title
          })
          setTitle(_title ?? '')
        }}
      />
    </>
  )
}
export default WebViewer
