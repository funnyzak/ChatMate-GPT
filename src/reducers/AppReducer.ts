/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { ABOUT_US } from '@src/config'
import {
  APP_INIT,
  APP_INIT_ERROR,
  APP_LATEST_VERSION,
  Action,
  IState
} from '../types'
const INITIAL_STATE: IState.AppState = {
  aboutUs: ABOUT_US,
  version: {
    version: '1.0.0'
  }
}
export default (
  state: IState.AppState = INITIAL_STATE,
  action: Action
): IState.AppState => {
  switch (action.type) {
    case APP_INIT:
      return { ...state, ...action.payload }
    case APP_LATEST_VERSION:
      return { ...state, latestVersion: action.payload }
    case APP_INIT_ERROR:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}
