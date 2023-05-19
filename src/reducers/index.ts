/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { combineReducers } from 'redux'
import AppReducer from './AppReducer'
import CacheReducer from './CacheReducer'
import ChatReducer from './ChatReducer'
import ChatSettingReducer from './ChatSettingReducer'
import OpenAiSettingReducer from './OpenAiSettingReducer'
import SettingReducer from './SettingReducer'
const reducers = combineReducers({
  app: AppReducer,
  setting: SettingReducer,
  chat: ChatReducer,
  chatSetting: ChatSettingReducer,
  openAISetting: OpenAiSettingReducer,
  cache: CacheReducer
})
export default reducers
