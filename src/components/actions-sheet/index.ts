/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { registerSheet } from 'react-native-actions-sheet'
import ConfirmSheet from './ConfirmSheet'
import ContentSheet from './ContentSheet'
import NodeSheet from './NodeSheet'
import './MenuSheet'
registerSheet('confirm-sheet', ConfirmSheet, 'global')
registerSheet('content-sheet', ContentSheet, 'global')
registerSheet('node-sheet', NodeSheet, 'global')
export {}
/**
 * Since we are not importing our Sheets in any component or file, we want to make sure
 * they are bundled by the JS bundler. Hence we will import this file in App.js.
 */
