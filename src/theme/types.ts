/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Header } from './common'
import { ImageSourcePropType, TextStyle } from 'react-native'
export interface ColorPalette {
  /**
   * ========================= App Logo color =========================
   */
  AppLight: string
  AppDark: string
  /**
   * ========================= Primary color : (Brand color) =========================
   */
  primaryDark: string
  primary: string
  primaryLight: string
  onPrimary: string
  appbarTint: string
  appbarIcon: string
  /**
   * ========================= Secondary color =========================
   * secondaryLight: to be used for hover state
   * secondary: to be used as default button, checkbox, spinner, radio button and other component color
   * secondaryDark: to be used for active state
   */
  secondaryLight: string
  secondary: string
  secondaryDark: string
  onSecondary: string
  /**
   * ========================= Tertiary color =========================
   * tertiaryLight: to be used for hover state
   * tertiary: to be used as default button, checkbox, spinner, radio button and other component color
   * tertiaryDark: to be used for active state
   */
  tertiaryLight: string
  tertiary: string
  tertiaryDark: string
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older AndroiddisabledDark devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: string
  /**
   * The screen background.
   */
  background: string
  headerBackground: string
  inputBackground: string
  headerBorder: string
  backgroundDark: string
  backgroundDarker: string
  backgroundLight: string
  /**
   * To be used as a default background for all components, like Card, CardSection, List etc
   */
  surface: string
  primaryText: string
  regularText: string
  secondaryText: string
  placeholderText: string
  captionText: string
  /**
   * disabled: To be used for disabled component background
   * disabledDark: To be used for disabled component border and text color
   */
  disabled: string
  disabledDark: string
  onDisabled: string
  /**
   * Success messages and icons.
   */
  success: string
  /**
   * Danger messages and icons.
   */
  danger: string
  /**
   * Warning messages and icons.
   */
  warning: string
  /**
   * Info messages and icons.
   */
  info: string
  borderBase: string
  borderDark: string
  borderLight: string
  borderLighter: string
  borderExtraLight: string
  overlay: string
  dark: string
  white: string

  chat: {
    loadEarlier: {
      wrapperBackground: string
    }
    bubble: {
      leftWrapperBackground: string
      rightWrapperBackground: string
      leftText: string
      rightText: string
      leftTick: string
      rightTick: string
      userName: string
    }
  }
}
export interface Dimensions {
  /**
   * App level constants
   */
  WINDOW_WIDTH: number
  WINDOW_HEIGHT: number
  layoutContainerWidth: number
  layoutContainerHorizontalMargin: number
  headerHeight: number
  headerButtonSize: number
  badgeSize: number
  borderRadius: number
  defaultButtonWidth: number
  defaultButtonHeight: number
  defaultButtonRadius: number
  defaultLineWidth: number
  defaultInputBoxHeight: number
}
export interface Spacing {
  tiny: number
  small: number
  medium: number
  large: number
  extraLarge: number
}
export interface Typography {
  /**
   * BigTitle is reserved for the title of main area of a screen.
   * It should be used sparingly, as it is the largest text style in the system.
   */
  bigTitleText: TextStyle
  bigTitleTextBold: TextStyle
  /**
   * Title is reserved for the title of a screen(Toolbar)
   * and the titles of Modal dialogs.
   */
  titleText: TextStyle
  titleTextSemiBold: TextStyle
  /**
   * Use the Heading style for card titles.
   */
  headingText: TextStyle
  headingTextBold: TextStyle
  /**
   * Use the Subheading style to denote new sections within cards.
   */
  subheadingText: TextStyle
  subheadingTextBold: TextStyle
  /**
   * The Body text style is used widely throughout the UI.
   * Any text that isn’t a title, heading, subheading, label
   * or caption would generally use the Body style.
   */
  bodyText: TextStyle
  bodyTextBold: TextStyle
  /**
   * Use labels with form field and input elements to
   * signify the element’s function to the user.
   */
  labelText: TextStyle
  labelTextBold: TextStyle
  /**
   * Use the Caption style for help/hint text.
   * It’s used with some form fields which require a description,
   * and can also be used stand-alone within a card when necessary.
   */
  captionText: TextStyle
  captionTextBold: TextStyle
  /**
   * Use this style to change <Input /> element text style
   */
  inputText: TextStyle
}
export interface ThemeAssets {
  images: {
    general: {
      chatgpt: ImageSourcePropType
    }
    drawer: {
      add: ImageSourcePropType
      appCenter: ImageSourcePropType
      chat: ImageSourcePropType
      nightMode: ImageSourcePropType
      recycle: ImageSourcePropType
      setting: ImageSourcePropType
      share: ImageSourcePropType
    }
    form: {
      send: ImageSourcePropType
    }
    header: {
      back: ImageSourcePropType
      edit: ImageSourcePropType
      message: ImageSourcePropType
    }
    setting: {
      apiKey: ImageSourcePropType
      apiServer: ImageSourcePropType
      chatModel: ImageSourcePropType
      nightMode: ImageSourcePropType
      email: ImageSourcePropType
      language: ImageSourcePropType
      lightMode: ImageSourcePropType
      limitCount: ImageSourcePropType
      privacyPolicy: ImageSourcePropType
      rightArrow: ImageSourcePropType
      share: ImageSourcePropType
      theme: ImageSourcePropType
    }
  }
}

export type StatusBarStyle = 'light-content' | 'dark-content'
export interface Theme {
  name: string
  statusBarStyle: StatusBarStyle
  isDark: boolean
  colors: ColorPalette
  spacing: Spacing
  dimensions: Dimensions
  typography: Typography
  assets: ThemeAssets
}
