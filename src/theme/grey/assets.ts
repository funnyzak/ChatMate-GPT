/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import { ThemeAssets } from '@src/types'
const Assets: ThemeAssets = {
  images: {
    general: {
      chatgpt: require('@src/assets/images/light/general/chatgpt.png')
    },
    drawer: {
      add: require('@src/assets/images/light/drawer/add.png'),
      appCenter: require('@src/assets/images/light/drawer/appCenter.png'),
      chat: require('@src/assets/images/light/drawer/chat.png'),
      nightMode: require('@src/assets/images/light/drawer/darkMode.png'),
      recycle: require('@src/assets/images/light/drawer/recycle.png'),
      setting: require('@src/assets/images/light/drawer/setting.png'),
      share: require('@src/assets/images/light/drawer/share.png')
    },
    form: {
      send: require('@src/assets/images/light/form/send.png')
    },
    header: {
      back: require('@src/assets/images/light/header/back.png'),
      edit: require('@src/assets/images/light/header/edit.png'),
      message: require('@src/assets/images/light/header/message.png')
    },
    setting: {
      apiKey: require('@src/assets/images/light/setting/apiKey.png'),
      apiServer: require('@src/assets/images/light/setting/apiServer.png'),
      chatModel: require('@src/assets/images/light/setting/chatModel.png'),
      nightMode: require('@src/assets/images/light/setting/darkMode.png'),
      email: require('@src/assets/images/light/setting/email.png'),
      language: require('@src/assets/images/light/setting/language.png'),
      lightMode: require('@src/assets/images/light/setting/lightMode.png'),
      limitCount: require('@src/assets/images/light/setting/limitCount.png'),
      privacyPolicy: require('@src/assets/images/light/setting/privacyPolicy.png'),
      rightArrow: require('@src/assets/images/light/setting/right-arrow.png'),
      share: require('@src/assets/images/light/setting/share.png'),
      theme: require('@src/assets/images/light/setting/theme.png')
    }
  }
}
export default Assets
