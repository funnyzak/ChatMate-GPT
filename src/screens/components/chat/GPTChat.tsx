/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-16.
 */

import {
  setChattUserMessage,
  setCurrentConversation
} from '@src/actions'
import { Avatar as AvatarImg } from '@src/components'
import {
  PromptPlacehoderTestRule,
  distinctConversationMessages,
  gptMessageContent,
  hasMessageInConversation,
  removeMessageFromConversation,
  useQuickAction
} from '@src/helper'
import { logInfo } from '@src/helper/logger'
import {
  useAppDispatch,
  useAppSelector,
  useGPTChat,
  useSettingAction
} from '@src/hooks'
import { getLocale, translate } from '@src/i18n'
import { RootState } from '@src/store'
import { useTheme } from '@src/theme'
import { ChatConversation, ChatMessage } from '@src/types'
import { haptic } from '@src/utils/haptic'
import { ChatCompletionRequestMessageRoleEnum } from '@src/utils/openai-api'
import { loadData } from '@src/utils/paging'
import {
  dateOrMillisecondToSecondTimestamp,
  findMin,
  wait
} from '@src/utils/utils'
import { uuidv4 } from '@src/utils/uuid'
import { sortBy } from 'lodash'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Keyboard, Platform, Text, View } from 'react-native'
import {
  Avatar,
  Composer,
  ComposerProps,
  Day,
  DayProps,
  GiftedChat,
  GiftedChatProps,
  IMessage,
  InputToolbar,
  LoadEarlier,
  LoadEarlierProps,
  Message,
  MessageProps,
  Send,
  SystemMessage,
  Time
} from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icons from '../common/Icons'
import { MessageBubble } from './Bubble'
import {
  ChatBubbleStyles,
  ChatComposerStyles,
  ChatDayStyles,
  ChatInputToolbarStyles,
  ChatLoadEarlierStyles,
  ChatSendStyles,
  ChatSystemMessageStyles
} from './ChatStyles'
import { RichMessageText } from './MessageText'
const AVATAR_SIZE = 36
const USER_ID = {
  user: 1,
  assistant: 2
}
export interface ChatProps extends GiftedChatProps {
  conversation: ChatConversation
}
export const ChatCompontent = (chat: ChatProps) => {
  const { theme } = useTheme()
  const {
    setting,
    chatSetting,
    openAISetting,
    cache,
    chat: chatState
  } = useAppSelector((state: RootState) => state)
  const currentConversation = useMemo(
    () =>
      cache.conversations && cache.conversations[chat.conversation.id]
        ? cache.conversations![chat.conversation.id]
        : chat.conversation,
    [cache.conversations, chat.conversation.id]
  )
  const {
    GptRequest,
    requesting,
    resetGptChat,
    gptResponse,
    messageStreaming,
    messageError
  } = useGPTChat(currentConversation)
  const dispatch = useAppDispatch()
  const giftedChatRef = useRef<any>()
  const { deviceModelInfo, checkIsSetAPIKey, featureTips } =
    useQuickAction()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [recentUserSendMessage, setRecentUserSendMessage] =
    useState<IMessage>()
  const [isKeyboardRaised, setIsKeyboardRaised] =
    useState<boolean>(false)
  const [isTextInputFocused, setIsTextInputFocused] =
    useState<boolean>(false)
  const { checkAndSyncICloud } = useSettingAction()

  const loadDatePageCount = useMemo(
    () =>
      !chatSetting.loadEarlier
        ? 1000
        : deviceModelInfo.isBigScreen
        ? 10
        : 5,
    [chatSetting]
  )
  const realtimeChatMessages = useMemo(
    () =>
      sortBy(
        currentConversation.messages,
        (v: ChatMessage) => v.createAt
      ),
    [currentConversation.messages]
  )
  const [isLoadingEarlier, setIsLoadingEarlier] =
    useState<boolean>(false)
  const chatMessageMinCreateTimeChatId = useMemo(() => {
    if (chatMessages && chatMessages.length > 0) {
      return (
        findMin(
          chatMessages,
          (v: ChatMessage) => v.createAt
        ) as ChatMessage
      ).id
    }
    return undefined
  }, [chatMessages])
  const sortedMessage = useMemo(
    () =>
      messages
        ? messages.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return (b.createdAt as number) - (a.createdAt as number)
            }
            return 0
          })
        : [],
    [messages]
  )
  const conversationMessagesMinCreateTimeChatId = useMemo(() => {
    if (realtimeChatMessages && realtimeChatMessages.length > 0) {
      return (
        findMin(
          realtimeChatMessages,
          (v: ChatMessage) => v.createAt
        ) as ChatMessage
      ).id
    }
    return undefined
  }, [realtimeChatMessages])
  useEffect(() => {
    const messageContent = gptMessageContent(gptResponse)
    setIsTyping(requesting && !messageContent)
    if (!messageContent) return
    const gptMessageId = gptResponse!.id
    const gptMessage = messages.find((v) => v._id === gptMessageId)
    if (gptMessage) {
      gptMessage.text = messageContent
      gptMessage.createdAt = gptResponse!.created * 1000
      setMessages((_prev: IMessage[]) => {
        return _prev.map((v: IMessage) =>
          v._id === gptMessageId
            ? {
                ...gptMessage,
                _model: gptResponse!.model,
                _tokenUsage: gptResponse!.usage
              }
            : v
        )
      })
    } else {
      onSend(
        [
          {
            _id: gptMessageId,
            text: messageContent!,
            createdAt: (gptResponse as any).created * 1000,
            user: GptUser
          }
        ],
        'assistant',
        false
      )
    }
    if (!messageStreaming && !requesting && gptMessage) {
      appendChatMessages([gptMessage], 'assistant')
      resetGptChat()
    }
  }, [messageStreaming, requesting, gptResponse])
  const removeRecentErrorMessage = useCallback(() => {
    if (messages && messages.length > 0) {
      const [latestMessage] = sortedMessage
      if (latestMessage.user._id !== USER_ID.user) return
      setMessages((prev) => {
        return prev.filter((v) => latestMessage._id !== v._id)
      })
      setChatMessages((prev) => {
        return prev && prev.length > 0
          ? prev.filter((v) => latestMessage._id !== v.id)
          : prev
      })
      if (
        hasMessageInConversation(
          currentConversation,
          latestMessage._id as string
        )
      ) {
        dispatch(
          setCurrentConversation(
            removeMessageFromConversation(
              currentConversation,
              latestMessage._id as string
            ),

            true
          ) as any
        )
      }
    }
  }, [messages, currentConversation, cache.conversations])
  const hasEarlierData = useMemo(() => {
    return (
      chatMessageMinCreateTimeChatId !==
        conversationMessagesMinCreateTimeChatId &&
      realtimeChatMessages &&
      realtimeChatMessages.length > 0
    )
  }, [
    chatMessageMinCreateTimeChatId,
    conversationMessagesMinCreateTimeChatId
  ])
  const safeInsets = useSafeAreaInsets()
  const offsetBottom = useMemo(
    () => (safeInsets.bottom === 0 ? 20 : safeInsets.bottom),
    [safeInsets.bottom]
  )
  const dayjsLocate = useMemo(
    () => getLocale(),
    [setting.languageTag]
  )
  const chatModel = useMemo(
    () => currentConversation?.config?.model || openAISetting.model,
    [currentConversation?.config?.model, openAISetting.model]
  )
  const inputPlaceholder = useMemo(
    () =>
      openAISetting.showModelName
        ? translate('chat.inputPlaceholderWithModel').replace(
            '{model}',
            chatModel
          )
        : translate('chat.inputPlaceholder'),
    [chatModel, setting.languageTag, openAISetting]
  )
  const GptUser = useMemo(
    () => ({
      _id: USER_ID.assistant,
      name: chatSetting.userName,
      avatar: (props: any) => (
        <Avatar
          {...props}
          renderAvatar={() => (
            <Icons.ChatMate
              size={AVATAR_SIZE}
              theme={theme}
              type={'chatmate'}
            />
          )}
        />
      )
    }),
    [theme]
  )
  // send user info
  const SendUser = useMemo(
    () => ({
      _id: USER_ID.user,
      avatar: (props: any) => (
        <Avatar
          {...props}
          renderAvatar={() => (
            <AvatarImg
              size={AVATAR_SIZE}
              style={{
                borderRadius: AVATAR_SIZE / 2
              }}
              source={{ uri: chatSetting.avatarImgUrl }}
            />
          )}
        />
      )
    }),
    [theme, chatSetting]
  )
  const mapConvertaionMessages = (
    _messages: ChatMessage[]
  ): IMessage[] =>
    _messages.map((v: ChatMessage) => ({
      _id: v.id,
      text: v.message.content,
      createdAt: v.createAt * 1000,
      _model: v.model,
      _tokenUsage: v.usage,
      user: v.message.role === 'user' ? SendUser : GptUser
    }))
  const loadEarliestMessageData = () => {
    if (realtimeChatMessages) {
      const _chatMessages = loadData({
        items: realtimeChatMessages,
        loadCount: loadDatePageCount,
        startItem:
          chatMessages.length > 0
            ? (v: ChatMessage) =>
                v.id === chatMessageMinCreateTimeChatId
            : undefined,
        direction: 'earliest'
      })
      setChatMessages((_previousMessages: ChatMessage[]) => {
        const _newChatMessages =
          _chatMessages.concat(_previousMessages)
        return _newChatMessages
      })
      setMessages((_previousMessages: IMessage[]) =>
        GiftedChat.prepend(
          _previousMessages,
          mapConvertaionMessages(_chatMessages)
        )
      )
    } else {
      logInfo('No message data')
    }
  }
  const onLoadEarlier = () => {
    setIsLoadingEarlier(true)
    loadEarliestMessageData()
    setIsLoadingEarlier(false)
  }

  useEffect(() => {
    setMessages([])
    setChatMessages([])
    setIsTyping(false)
    setIsTextInputFocused(false)
    setIsLoadingEarlier(false)
    setRecentUserSendMessage(undefined)
    // removeRecentErrorMessage()
    logInfo(
      'Change conversation',
      JSON.stringify(currentConversation)
    )
    // keyboard event
    Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardRaised(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardRaised(false)
    })
    // set default input text
    setInputTextValue(currentConversation?.recentInputText || '')
    onLoadEarlier()
  }, [currentConversation.id])

  useEffect(() => {
    if (chatSetting.alwaysShowPrompt) {
      setMessages((_previousMessages: IMessage[]) =>
        GiftedChat.append(_previousMessages, [
          {
            _id: ('sm-' + uuidv4()) as string,
            text:
              currentConversation.prompt &&
              currentConversation.prompt.length > 0
                ? currentConversation.prompt.replace(
                    PromptPlacehoderTestRule,
                    `[${translate('common.eg')}${translate(
                      'symbol.colon'
                    )}$2]`
                  )
                : translate('chat.prompt.noTips'),
            createdAt: new Date().getTime(),
            user: SendUser,
            system: true
          }
        ])
      )
    }
  }, [
    currentConversation.prompt,
    chatSetting.alwaysShowPrompt,
    currentConversation.id,
    setting.languageTag
  ])

  // // 有初始化消息时则进行消息发送
  useEffect(() => {
    if (chatState.userMessage && chatState.userMessage.length > 0) {
      dispatch(setChattUserMessage(undefined))
      onSend([
        {
          _id: uuidv4() as string,
          text: chatState.userMessage!,
          createdAt: new Date().getTime(),
          user: SendUser
        }
      ])
    }
  }, [chatState.userMessage])

  const onSend = useCallback(
    (
      _messages: IMessage[],
      role: ChatCompletionRequestMessageRoleEnum = 'user',
      addChatMessage: boolean = true
    ) => {
      // logInfo('On send message', _messages)

      let _newMessages: IMessage[] = _messages.map((v) => ({
        ...v,
        id: v._id,
        createdAt:
          typeof v.createdAt === 'number'
            ? v.createdAt
            : v.createdAt.getTime()
        // sent: true
      }))
      if (role === 'user') {
        if (requesting) return
        setIsTyping(true)
        setting.hapticFeedback && haptic()
        setRecentUserSendMessage(_newMessages[0])
      }
      setMessages((_previousMessages: IMessage[]) =>
        GiftedChat.append(_previousMessages, _newMessages)
      )
      if (addChatMessage) {
        appendChatMessages(_newMessages, role)
      }
    },
    [currentConversation, chatSetting, chatModel]
  )
  const appendChatMessages = (
    _messages: IMessage[],
    role: ChatCompletionRequestMessageRoleEnum = 'user'
  ) => {
    const _chatMessages: ChatMessage[] = _messages.map(
      (v: IMessage) => ({
        id: v._id as string,
        createAt: dateOrMillisecondToSecondTimestamp(v.createdAt),
        prompt: currentConversation.prompt,
        model:
          role === 'assistant' &&
          gptResponse &&
          gptResponse.id === (v._id as string)
            ? (gptResponse.model as any)
            : chatModel,
        usage:
          role === 'assistant' &&
          gptResponse &&
          gptResponse.usage &&
          gptResponse.id === (v._id as string)
            ? gptResponse.usage
            : undefined,
        message: {
          content: v.text!,
          role: role
        }
      })
    )
    logInfo(
      'Append chat messages',
      _chatMessages,
      'gptResponse',
      gptResponse
    )
    setChatMessages((_previousMessages: ChatMessage[]) => {
      const _merge_messages = distinctConversationMessages([
        _previousMessages,
        _chatMessages
      ])
      dispatch(
        setCurrentConversation({
          ...currentConversation,
          recentInputText:
            role === 'user'
              ? ''
              : currentConversation.recentInputText,
          messages: distinctConversationMessages([
            currentConversation.messages ?? [],
            _chatMessages
          ])
        }) as any
      )
      return _merge_messages
    })
    if (role === 'user') {
      setTimeout(() => {
        GptRequest({
          messages: _chatMessages,
          stream: chatSetting.streamMessage,
          errorHandle(_error: any) {
            logInfo('Gpt request error handler', _error)
          }
        })
      }, 500)
    } else if (role === 'assistant') {
      // 消息功能使用提醒
      featureTips('messageBubble', {
        visibilityTime: 10000
      })

      // 同步iCloud
      wait(700, checkAndSyncICloud)
    }
  }

  useEffect(() => {
    if (!messageError) return
    removeRecentErrorMessage()
    recentUserSendMessage &&
      setInputTextValue(recentUserSendMessage?.text)
  }, [messageError])

  const setInputTextValue = useCallback(
    (text: string, focus = false) => {
      if (giftedChatRef && giftedChatRef.current) {
        giftedChatRef!.current!.setTextFromProp(text)
        if (focus) {
          setTimeout(
            () => giftedChatRef?.current?.focusTextInput(),
            600
          )
        }
      }
    },
    [giftedChatRef?.current]
  )

  /**
   * 设置最后一条失败消息到输入框
   * @param currentMessage
   * @returns
   */
  const setlastFailMessageToInputText = useCallback(
    (currentMessage: IMessage) => {
      if (
        currentConversation.recentInputText &&
        currentConversation.recentInputText.length > 0
      )
        return
      logInfo('SetlastFailMessageToInputText', currentMessage)

      if (currentMessage.user._id === USER_ID.user) {
        setInputTextValue(currentMessage.text, true)
      }
    },
    [giftedChatRef?.current, currentConversation]
  )

  const renderSendButton = (props: any) => {
    return (
      <Send
        {...props}
        disabled={!props.text}
        containerStyle={ChatSendStyles.container(theme)}>
        <Icons.chat.Send theme={theme} />
      </Send>
    )
  }
  /**
   * send composer
   * @param props
   * @returns
   */
  const renderComposer = (props: ComposerProps) => (
    <Composer
      {...props}
      keyboardAppearance={theme.isDark ? 'dark' : 'light'}
      textInputProps={{
        scrollEnabled: true,
        autoCorrect: false,
        placeholderTextColor: theme.colors.placeholderText,
        onBlur: () => {
          setIsTextInputFocused(false)
        },
        onFocus: () => {
          // checkIsSetAPIKey(true)
          setIsTextInputFocused(true)
          giftedChatRef?.current?.scrollToBottom()
        }
      }}
      textInputStyle={ChatComposerStyles.textInput(
        theme,
        chatSetting.fontSizeRatio
      )}
    />
  )
  /**
   *  custom input toolbar
   * @param props
   * @returns
   */
  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={ChatInputToolbarStyles.container(
          theme,
          offsetBottom
        )}
        primaryStyle={ChatInputToolbarStyles.primary(
          theme,
          isTextInputFocused ? 'focus' : 'blur'
        )}
      />
    )
  }

  const renderSystemMessage = (props: any) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={ChatSystemMessageStyles.container(theme)}
        textStyle={ChatSystemMessageStyles.text(
          theme,
          chatSetting.fontSizeRatio
        )}
      />
    )
  }

  const renderLoadEarlier = (props: LoadEarlierProps) => {
    return (
      <LoadEarlier
        {...props}
        textStyle={ChatLoadEarlierStyles.text(
          theme,
          chatSetting.fontSizeRatio
        )}
        wrapperStyle={ChatLoadEarlierStyles.wrapper(theme)}
        label={translate('chat.loadEarlierMessages')}
      />
    )
  }
  /**
   * Lets the message component know when to update outside of normal cases.
   * @param props
   * @param nextProps
   * @returns
   */
  const shouldUpdateMessage = useCallback(
    (
      props: MessageProps<IMessage>,
      nextProps: MessageProps<IMessage>
    ) => {
      // const _locale = giftedChatRef.current?.getLocale()
      // const _setting_locale = getFullLocale()
      // if (_locale !== _setting_locale) {
      //   // console.log('shouldUpdateMessage', _locale, _setting_locale)
      //   giftedChatRef.current?.setLocale(_setting_locale)
      //   return true
      // }
      return false
    },
    [setting.languageTag, giftedChatRef.current]
  )
  const onInputTextChange = (text?: string) => {
    dispatch(
      setCurrentConversation({
        ...currentConversation,
        recentInputText: text
      }) as any
    )
  }

  const renderBubble = useCallback(
    (props: any) => {
      return (
        <MessageBubble
          {...props}
          conversation={currentConversation}
        />
      )
    },
    [setting.languageTag, openAISetting, giftedChatRef.current, theme]
  )

  const renderFooter = () => {
    return (
      <View>
        <Text>Footer</Text>
      </View>
    )
  }
  const renderDay = useCallback(
    (props: DayProps<IMessage>) => {
      return (
        <Day
          {...props}
          wrapperStyle={ChatDayStyles.wrapper(theme)}
          textStyle={ChatDayStyles.text(
            theme,
            chatSetting.fontSizeRatio
          )}
        />
      )
    },
    [setting.languageTag, theme, chatSetting]
  )
  const renderTime = useCallback(
    (props: any) => {
      return (
        <Time
          {...props}
          timeTextStyle={ChatBubbleStyles.tick(
            theme,
            chatSetting.fontSizeRatio
          )}
        />
      )
    },
    [setting.languageTag, theme]
  )
  const renderMessage = useCallback(
    (props: MessageProps<IMessage>) => {
      return <Message {...props} />
    },
    [theme]
  )
  const renderMessageText = (props: any) => (
    <RichMessageText
      {...props}
      conversation={currentConversation}
      renderMD={openAISetting.renderMd}
    />
  )
  return (
    <GiftedChat
      messages={sortedMessage}
      alignTop
      infiniteScroll
      alwaysShowSend={chatSetting.alwaysShowSend}
      // pad use typing animation
      isTyping={isTyping && deviceModelInfo.isBigScreen}
      typingIndicatorStyle={{
        backgroundColor: theme.colors.borderLighter,
        dotColor: theme.colors.secondaryText
      }}
      scrollToBottom={false}
      ref={(r) => {
        giftedChatRef.current = r
      }}
      showUserAvatar={chatSetting.showUserAvatar}
      renderUsernameOnMessage={chatSetting.showUserName}
      renderComposer={renderComposer}
      renderMessage={renderMessage}
      timeTextStyle={ChatBubbleStyles.tick(
        theme,
        chatSetting.fontSizeRatio
      )}
      renderMessageText={renderMessageText}
      renderSend={renderSendButton}
      // renderFooter={renderFooter}
      renderBubble={renderBubble}
      renderLoadEarlier={renderLoadEarlier}
      renderSystemMessage={renderSystemMessage}
      renderDay={renderDay}
      // isKeyboardInternallyHandled={isTextInputFocused}
      renderTime={renderTime}
      renderInputToolbar={renderInputToolbar}
      maxComposerHeight={theme.dimensions.defaultInputBoxHeight * 2}
      disableComposer={isTyping || requesting}
      loadEarlier={chatSetting.loadEarlier && hasEarlierData}
      isLoadingEarlier={isLoadingEarlier}
      onLoadEarlier={onLoadEarlier}
      shouldUpdateMessage={shouldUpdateMessage}
      onInputTextChanged={onInputTextChange}
      messagesContainerStyle={{
        // paddingBottom: isKeyboardRaised ? 0 : 35
        // height: isKeyboardRaised ? undefined : '100%'
        width: '100%',
        paddingBottom: 0
      }}
      scrollToBottomStyle={{
        bottom: 100
      }}
      placeholder={inputPlaceholder}
      onSend={onSend}
      user={SendUser}
      listViewProps={{
        indicatorStyle: theme.isDark ? 'white' : 'black',
        style: {
          flex: 1,
          width: '100%'
        },
        contentContainerStyle: {
          paddingTop: 80
        }
      }}
      bottomOffset={-offsetBottom * 0.5}
      inverted={Platform.OS !== 'web'}
      locale={dayjsLocate}
      {...chat}
    />
  )
}
