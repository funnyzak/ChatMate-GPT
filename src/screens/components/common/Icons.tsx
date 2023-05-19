/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-03.
 */

import {
  ArrowLeft,
  ChatGptSvg,
  ChatMateSvg,
  ChatSvg,
  CloseSvg,
  DiscordSvg,
  EditSvg,
  EmailSvg,
  FaqSvg,
  GithubSvg,
  KeySvg,
  LanguageSvg,
  LightModeSvg,
  MarkdownSvg,
  MaxSvg,
  MoreSvg,
  OpenSourceSvg,
  PrivacyPolicySvg,
  ReplaySvg,
  SendSvg,
  ServerSvg,
  TelegramSvg,
  ThemeSvg,
  TwitterSvg
} from '@src/svg'
import { Theme } from '@src/theme'
import _ from 'lodash'
import React from 'react'
import { TextStyle, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
export const iconSetting = (theme: Theme) => ({
  setting: {
    width: theme.dimensions.headerButtonSize - 3,
    height: theme.dimensions.headerButtonSize - 3,
    size: theme.dimensions.headerButtonSize - 3,
    color: theme.colors.regularText,
    style: {
      marginRight: theme.spacing.small
    }
  },
  settingArrow: {
    width: theme.dimensions.headerButtonSize - 7,
    height: theme.dimensions.headerButtonSize - 7,
    size: theme.dimensions.headerButtonSize - 7,
    color: theme.colors.secondaryText,
    style: {
      marginLeft: theme.spacing.tiny - 4
    }
  },
  drawer: {
    width: theme.dimensions.headerButtonSize - 4,
    height: theme.dimensions.headerButtonSize - 4,
    size: theme.dimensions.headerButtonSize - 4,
    color: theme.colors.regularText,
    style: {
      marginRight: theme.spacing.small
    }
  },
  common: {
    width: theme.dimensions.headerButtonSize - 4,
    height: theme.dimensions.headerButtonSize - 4,
    size: theme.dimensions.headerButtonSize - 4,
    color: theme.colors.regularText,
    style: {}
  },
  header: {
    width: theme.dimensions.headerButtonSize,
    height: theme.dimensions.headerButtonSize,
    color: theme.colors.appbarIcon,
    size: theme.dimensions.headerButtonSize
  },
  input: {
    width: 18,
    height: 18,
    color: theme.colors.placeholderText,
    size: 18
  },
  chat: {
    width: theme.dimensions.headerButtonSize * 1.1,
    height: theme.dimensions.headerButtonSize * 1.1,
    color: theme.colors.primary,
    size: theme.dimensions.headerButtonSize * 1.1
  }
})

export interface IonIconProps {
  name:
    | 'open'
    | 'add'
    | 'ellipsis-horizontal'
    | 'archive'
    | 'trash'
    | 'layers'
    | 'settings'
    | 'moon'
    | 'rocket'
    | 'sunny'
    | 'share-social'
    | 'pricetag'
    | 'server'
    | 'trending-up'
    | 'chatbubbles'
    | 'receipt'
    | 'reader'
    | 'chatbubble'
    | 'chatbubble-ellipses'
    | 'chatbox-ellipses'
    | 'chatbox'
    | 'copy'
    | 'star'
    | 'star-half'
  type?: 'outline' | 'sharp'
  theme: Theme
  style?: TextStyle
}

export const Ions = ({
  name,
  theme,
  type = 'outline',
  style
}: IonIconProps) => (
  <Ionicons
    name={`${name}-${type}`}
    style={style ?? iconSetting(theme).common.style}
    size={style?.fontSize || iconSetting(theme).common.size}
    color={style?.color || theme.colors.regularText}
  />
)

export default {
  ChatMate: ({
    theme,
    size = 60,
    type = 'chatmate'
  }: {
    theme: Theme
    size: number
    type?: 'chatgpt' | 'chatmate'
  }) => {
    return (
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: theme.colors.primary,
          borderRadius: size / 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
        {type === 'chatgpt' ? (
          <ChatGptSvg
            width={size - size * 0.1}
            height={size - size * 0.1}
            style={{}}
            color={theme.colors.white}
          />
        ) : (
          <ChatMateSvg
            width={size - size * 0.35}
            height={size - size * 0.35}
            style={{}}
            color={theme.colors.white}
          />
        )}
      </View>
    )
  },
  common: ({
    name,
    theme,
    type = 'outline',
    style
  }: IonIconProps) => (
    <Ions
      name={name}
      theme={theme}
      type={type}
      style={_.mergeWith(iconSetting(theme).common.style, style)}
    />
  ),

  chat: {
    Send: ({ theme }: { theme: Theme }) => {
      return <SendSvg {...iconSetting(theme).chat} />
    }
  },
  input: {
    Eye: ({ theme }: { theme: Theme }) => {
      return <Ionicons name="eye" {...iconSetting(theme).input} />
    },
    EyeOff: ({ theme }: { theme: Theme }) => {
      return <Ionicons name="eye-off" {...iconSetting(theme).input} />
    },
    Clear: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons name="close-circle" {...iconSetting(theme).input} />
      )
    }
  },
  settings: {
    Key: ({ theme }: { theme: Theme }) => {
      return <KeySvg {...iconSetting(theme).setting} />
    },
    Server: ({ theme }: { theme: Theme }) => {
      return <ServerSvg {...iconSetting(theme).setting} />
    },
    common: ({ name, theme, type = 'outline' }: IonIconProps) => (
      <Ions
        name={name}
        theme={theme}
        type={type}
        style={iconSetting(theme).setting.style}
      />
    ),
    ChatModel: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="cube-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Network: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="timer-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    User: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="person-outline"
          {...iconSetting(theme).setting}
        />
      )
    },

    Link: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="link-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Scheme: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="link-outline"
          {...iconSetting(theme).setting}
          style={{
            ...iconSetting(theme).setting.style,
            transform: [{ rotate: '-45deg' }]
          }}
        />
      )
    },
    Temperature: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="thermometer-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Layers: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="layers-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Max: ({ theme }: { theme: Theme }) => {
      return <MaxSvg {...iconSetting(theme).setting} />
    },
    Messages: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="chatbubble-ellipses-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Tokens: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="beaker-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Replay: ({ theme }: { theme: Theme }) => {
      return (
        <ReplaySvg {...iconSetting(theme).setting} />
        // <FontAwesomeIcon
        //   name="reply"
        //   {...SvgSetting(theme).setting}
        //   color={theme.colors.regularText}
        // />
      )
    },
    ShowModelName: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="eye-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    ShowWordCount: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="text-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    ShowEstimatedTokenCount: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="stats-chart-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Personalise: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="person-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Hammer: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="hammer-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Code: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="code-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    FingerPrint: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="finger-print-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    ChatBox: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="chatbox-ellipses-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Pulse: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="pulse-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Theme: ({ theme }: { theme: Theme }) => {
      return <ThemeSvg {...iconSetting(theme).setting} />
    },
    LightMode: ({ theme }: { theme: Theme }) => {
      return <LightModeSvg {...iconSetting(theme).setting} />
    },
    OpenSource: ({ theme }: { theme: Theme }) => {
      return <OpenSourceSvg {...iconSetting(theme).setting} />
    },
    NightMode: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="moon-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Cloud: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="cloud-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Add: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="add-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Language: ({ theme }: { theme: Theme }) => {
      return <LanguageSvg {...iconSetting(theme).setting} />
    },
    PrivacyPolicy: ({ theme }: { theme: Theme }) => {
      return <PrivacyPolicySvg {...iconSetting(theme).setting} />
    },
    Email: ({ theme }: { theme: Theme }) => {
      return <EmailSvg {...iconSetting(theme).setting} />
    },
    Faq: ({ theme }: { theme: Theme }) => {
      return <FaqSvg {...iconSetting(theme).setting} />
    },
    Share: ({ theme }: { theme: Theme }) => {
      return (
        <Ionicons
          name="share-social-outline"
          {...iconSetting(theme).setting}
        />
      )
    },
    Discord: ({ theme }: { theme: Theme }) => {
      return <DiscordSvg {...iconSetting(theme).setting} />
    },
    Github: ({ theme }: { theme: Theme }) => {
      return <GithubSvg {...iconSetting(theme).setting} />
    },
    Telegram: ({ theme }: { theme: Theme }) => {
      return <TelegramSvg {...iconSetting(theme).setting} />
    },
    Twitter: ({ theme }: { theme: Theme }) => {
      return <TwitterSvg {...iconSetting(theme).setting} />
    },
    Markdown: ({ theme }: { theme: Theme }) => {
      return <MarkdownSvg {...iconSetting(theme).setting} />
    }
  },
  SettingArrow: ({
    theme,
    direction
  }: {
    theme: Theme
    direction: string
  }) => {
    const arrow =
      direction === undefined
        ? 'forward'
        : direction === 'right'
        ? 'forward'
        : direction === 'left'
        ? 'back'
        : direction
    return (
      <Ionicons
        name={`chevron-${arrow}-outline`}
        {...iconSetting(theme).settingArrow}
      />
    )
  },
  drawer: {
    common: ({ name, theme, type = 'outline' }: IonIconProps) => (
      <Ions
        name={name}
        theme={theme}
        type={type}
        style={iconSetting(theme).drawer.style}
      />
    ),
    LightMode: ({ theme }: { theme: Theme }) => {
      return <LightModeSvg {...iconSetting(theme).drawer} />
    }
  },
  headers: {
    Ionicons: ({
      theme,
      name,
      type = 'outline'
    }: {
      theme: Theme
      name: 'funnel' | 'hammer' | 'refresh'
      type?: 'outline'
    }) => {
      return (
        <Ionicons
          {...iconSetting(theme).header}
          size={iconSetting(theme).header.size - 4}
          name={`${name}-${type}`}
        />
      )
    },
    Back: ({ theme }: { theme: Theme }) => {
      return <ArrowLeft {...iconSetting(theme).header} />
    },

    Edit: ({ theme }: { theme: Theme }) => {
      return <EditSvg {...iconSetting(theme).header} />
    },
    Chats: ({ theme }: { theme: Theme }) => {
      return <ChatSvg {...iconSetting(theme).header} />
    },
    Close: ({ theme }: { theme: Theme }) => {
      return (
        <CloseSvg
          {...iconSetting(theme).header}
          width={iconSetting(theme).header.size - 3}
        />
      )
    },
    More: ({ theme }: { theme: Theme }) => {
      return <MoreSvg {...iconSetting(theme).header} />
    },
    MoreVertical: ({ theme }: { theme: Theme }) => {
      return (
        <MoreSvg
          {...iconSetting(theme).header}
          width={iconSetting(theme).header.size - 2}
          style={{
            transform: [{ rotate: '90deg' }]
          }}
        />
      )
    }
  }
}
