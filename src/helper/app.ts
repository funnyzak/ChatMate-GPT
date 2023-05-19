/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Store } from 'redux'
import { initApp } from '../actions'
import { logInfo } from './logger'
export const onAppStart = async (store: Store) => {
  store.dispatch(initApp() as any)
}
