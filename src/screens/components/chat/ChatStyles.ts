/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-22.
 */

import { SylCommon, Theme } from '@src/theme'
import { TextStyle, ViewStyle } from 'react-native/types'
import { iconSetting } from '../common/Icons'
import typographys from '@src/theme/grey/typography'

export type ChatStylePosition = 'left' | 'right'

const parseTextSize = (textSize: TextStyle, sizeRatio?: number) => {
  return {
    lineHeight: textSize.lineHeight! * (sizeRatio || 1),
    fontSize: textSize.fontSize! * (sizeRatio || 1)
  }
}

export const ChatDayStyles = {
  wrapper: (theme: Theme) => ({
    paddingTop: theme.spacing.tiny
  }),
  text: (theme: Theme, sizeRatio?: number) => ({
    ...parseTextSize(theme.typography.captionText, sizeRatio),
    color: theme.colors.captionText
  })
}
export const ChatInputToolbarStyles = {
  container: (theme: Theme, offsetBottom: number) => {
    return {
      backgroundColor: theme.colors.transparent,
      borderTopColor: theme.colors.transparent,
      paddingBottom: offsetBottom
    }
  },
  primary: (
    theme: Theme,
    status: 'blur' | 'focus' = 'blur'
  ): ViewStyle => {
    return {
      marginHorizontal: theme.spacing.large,
      backgroundColor: theme.colors.surface,
      borderWidth:
        status === 'blur'
          ? theme.dimensions.defaultLineWidth * 1.5
          : theme.dimensions.defaultLineWidth * 5,
      borderColor:
        status === 'blur'
          ? theme.colors.borderBase
          : theme.colors.primaryLight,
      borderRadius: 10,
      shadowColor:
        status === 'blur'
          ? theme.colors.primaryLight
          : theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: status === 'blur' ? 0.2 : 0.3,
      shadowRadius: 10,
      elevation: 3
    }
  }
}

export const ChatSystemMessageStyles = {
  container: (theme: Theme) => ({
    ...SylCommon.Card.container(theme),
    marginVertical: theme.spacing.small
  }),
  text: (theme: Theme, sizeRatio?: number) => ({
    ...theme.typography.captionText,
    ...parseTextSize(theme.typography.captionText, sizeRatio),
    color: theme.colors.captionText
  })
}

export const ChatSendStyles = {
  container: (theme: Theme) => {
    return {
      border: 0,
      alignSelf: 'flex-end',
      width: iconSetting(theme).chat.size,
      height: iconSetting(theme).chat.size,
      marginRight: theme.spacing.small,
      marginBottom: theme.spacing.small
    }
  }
}

export const ChatComposerStyles = {
  textInput: (theme: Theme, sizeRatio?: number): TextStyle => {
    return {
      ...theme.typography.bodyText,
      ...parseTextSize(theme.typography.bodyText, sizeRatio),
      textAlignVertical: 'center',
      color: theme.colors.primaryText
      // paddingVertical: theme.spacing.medium
    }
  }
}

export const ChatMessageTextCommonStyles: {
  common: TextStyle
} = {
  common: {
    fontSize: typographys.bodyText.fontSize!,
    lineHeight: typographys.bodyText.lineHeight!
  }
}

export const ChatLoadEarlierStyles = {
  wrapper: (theme: Theme): ViewStyle => ({
    backgroundColor: theme.colors.chat.loadEarlier.wrapperBackground
  }),
  text: (theme: Theme, sizeRatio?: number): TextStyle => ({
    ...theme.typography.captionText,
    color: theme.colors.white
  })
}

export const ChatMessageStyles = {
  text: (theme: Theme, sizeRatio?: number) => {
    const common = {
      ...theme.typography.bodyText,
      ...parseTextSize(theme.typography.bodyText, sizeRatio)
    }

    return {
      left: {
        ...common,
        color: theme.colors.chat.bubble.leftText
      },
      right: {
        ...common,
        color: theme.colors.chat.bubble.rightText
      }
    }
  },
  markdownText: (theme: Theme, sizeRatio?: number) => {
    const _sizeRatio = sizeRatio || 1
    const _fontSize = (ratio: number = 1) => {
      return {
        fontSize:
          ChatMessageTextCommonStyles.common.fontSize! *
          ratio *
          _sizeRatio,
        lineHeight:
          ChatMessageTextCommonStyles.common.lineHeight! *
          ratio *
          _sizeRatio
      }
    }

    const commonBlock = {
      backgroundColor: theme.colors.transparent,
      borderWidth: theme.dimensions.defaultLineWidth,
      borderColor: theme.colors.borderDark,
      color: theme.colors.chat.bubble.leftText,
      borderRadius: theme.dimensions.borderRadius
    }

    return {
      text: {
        color: theme.colors.chat.bubble.leftText
      },
      heading1: {
        ..._fontSize(2)
      },
      heading2: {
        ..._fontSize(1.5)
      },
      heading3: {
        ..._fontSize(1.3)
      },
      heading4: {
        ..._fontSize(1.2)
      },
      heading5: {
        ..._fontSize(1.1)
      },
      heading6: {
        ..._fontSize(1)
      },
      body: {
        ..._fontSize(1)
      },
      code_inline: {
        marginVertical: theme.spacing.tiny,
        backgroundColor: theme.colors.transparent,
        color: theme.colors.secondaryText,
        ..._fontSize(0.9)
      },
      blockquote: {
        marginVertical: theme.spacing.tiny,
        ...commonBlock
      },
      code_block: {
        ...commonBlock,
        marginVertical: theme.spacing.tiny
      },
      table: {
        ...commonBlock,
        marginVertical: theme.spacing.tiny
      },
      fence: {
        ..._fontSize(0.9),
        backgroundColor: theme.colors.transparent,
        borderWidth: 0,
        borderColor: theme.colors.transparent
      },
      ordered_list: {
        color: theme.colors.chat.bubble.leftText,
        marginVertical: theme.spacing.tiny,
        flexShrink: 0
      },
      ordered_list_content: {
        flex: 1
      },
      bullet_list: {
        color: theme.colors.chat.bubble.leftText,
        marginVertical: theme.spacing.tiny
      },

      bullet_list_icon: {
        marginLeft: 0,
        marginRight: theme.spacing.tiny
      },
      ordered_list_icon: {
        marginLeft: 0,
        marginRight: theme.spacing.tiny
      },
      paragraph: {
        marginVertical: theme.spacing.tiny
      }
    }
  }
}

export const ChatBubbleStyles = {
  wrapper: (theme: Theme, renderMd = false) => {
    return {
      left: {
        minHeight: 20,
        borderRadius: 15,
        backgroundColor:
          theme.colors.chat.bubble.leftWrapperBackground,
        justifyContent: 'flex-end'
      },
      right: {
        borderRadius: 15,
        backgroundColor:
          theme.colors.chat.bubble.rightWrapperBackground,
        minHeight: 20,
        justifyContent: 'flex-end'
      }
    }
  },
  container: (theme: Theme) => {
    return {
      left: {
        flex: 1
      },
      right: {
        flex: 1
      }
    }
  },

  tick: (theme: Theme, sizeRatio?: number) => {
    const common = {
      ...theme.typography.captionText,
      ...parseTextSize(theme.typography.captionText, sizeRatio)
    }
    return {
      left: {
        ...common,
        color: theme.colors.chat.bubble.leftTick
      },
      right: {
        ...common,
        color: theme.colors.chat.bubble.rightTick
      }
    }
  }
}
