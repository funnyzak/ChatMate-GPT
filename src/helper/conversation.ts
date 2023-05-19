import { removeConversation } from './../actions/CacheActions'
/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-12.
 */

import { ChatConversation, ChatMessage } from '@src/types'
export type ConversationOrderByType = 'updateTime' | 'createTime'
export type ConversationMap = {
  [key: string]: ChatConversation
}

export const distinctConversationMessages = (
  messages: Array<ChatMessage[]>
) => {
  const result: Array<ChatMessage> = []
  messages.forEach((message) => {
    if (!message) return
    message.forEach((m) => {
      if (!m) return
      if (!result.some((item) => item.id === m.id)) {
        result.push(m)
      }
    })
  })
  return result
}

export const removeMessageFromConversation = (
  conversation: ChatConversation,
  messageId: string
) => {
  if (!conversation || !conversation.messages || !messageId)
    return conversation
  const messages = conversation.messages.filter(
    (message) => message.id !== messageId
  )
  return {
    ...conversation,
    messages
  }
}

export const hasMessageInConversation = (
  converstation?: ChatConversation,
  messageId?: string
): boolean => {
  if (!converstation || !converstation.messages || !messageId)
    return false

  return converstation.messages.some(
    (message) => message.id === messageId
  )
}

export const sortConversations = (
  conversations: Array<ChatConversation>,
  orderBy: ConversationOrderByType = 'updateTime'
) => {
  return conversations.sort((a, b) => {
    const _orderBy =
      orderBy === 'updateTime' ? 'updateAt' : 'createAt'
    const aTime = a[_orderBy] || a.createAt
    const bTime = b[_orderBy] || b.createAt
    return bTime - aTime
  })
}
export const conversationListToMap = (
  conversations: Array<ChatConversation>,
  listSortBy?: ConversationOrderByType
): ConversationMap => {
  return (
    listSortBy
      ? sortConversations(conversations, listSortBy)
      : conversations
  ).reduce((acc, conversation) => {
    return {
      ...acc,
      [conversation.id]: conversation
    }
  }, {})
}
export const conversationMapToList = (
  conversations: ConversationMap
): Array<ChatConversation> => {
  return Object.keys(conversations).map((id) => conversations[id])
}
export const sortConversationMap = (
  conversations: {
    [key: string]: ChatConversation
  },
  mapSortBy: ConversationOrderByType = 'updateTime'
): ConversationMap => {
  return conversationListToMap(
    conversationMapToList(conversations),
    mapSortBy
  )
}
export const filterConversationMap = (
  conversations: {
    [key: string]: ChatConversation
  },
  filter: (conversation: ChatConversation) => boolean
): ConversationMap => {
  return conversationListToMap(
    conversationMapToList(conversations).filter(filter)
  )
}

export const removeConversationFromMap = (
  conversationMap?: ConversationMap,
  ids?: Array<string>
) => {
  if (!conversationMap || !ids) return conversationMap

  const newConversationMap = { ...conversationMap }
  ids.forEach((id) => {
    delete newConversationMap[id]
  })
  return newConversationMap
}

export const mergeConversationMaps = (
  ...conversationMaps: Array<ConversationMap | undefined>
) => {
  const result: ConversationMap = {}
  conversationMaps.forEach((conversationMap) => {
    if (conversationMap) {
      Object.keys(conversationMap).forEach((id) => {
        if (!result[id]) {
          result[id] = conversationMap[id]
        } else {
          // merget messages
          result[id] = {
            ...((result[id].updateAt || 0) >
            (conversationMap[id].updateAt || 0)
              ? result[id]
              : conversationMap[id]),
            messages: distinctConversationMessages([
              result[id].messages || [],
              conversationMap[id].messages || []
            ])
          }
        }
      })
    }
  })
  return result
}
