// support URL.searchParams
import 'react-native-url-polyfill/auto'
// support text-encoding
import 'text-encoding-polyfill'

import { AppRegistry, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

// Ignore log notification by message:
LogBox.ignoreLogs([
  'required dispatch_sync',
  'flexWrap',
  'VirtualizedLists should never',
  'Cannot update a component'
])

// Ignore all log notifications:
// LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App)
