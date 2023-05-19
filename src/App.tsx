/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { persistor, store } from '@src/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Spinner } from './components/common'
import { onAppStart } from './helper/app'
import { AppNavigationContainer } from './navigation/Navigator'
import { ThemeProvider } from './theme'
onAppStart(store)
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <ThemeProvider>
          <AppNavigationContainer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
export default App
