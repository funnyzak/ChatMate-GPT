/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-27.
 */

import { faker } from '@faker-js/faker'
import { ChatConversation } from '@src/types'
export const generalChatConversations = (count: number = 15) => {
  const conversations: ChatConversation[] = []
  for (let i = 0; i < count; i++) {
    conversations.push({
      id: faker.datatype.uuid(),
      title: faker.lorem.paragraph(),
      createAt: faker.datatype.datetime().getTime(),
      updateAt: faker.datatype.datetime().getTime(),
      perference: {
        maxMessagesInContext: 0
      },
      config: {
        model: faker.helpers.arrayElement([
          'davinci',
          'curie',
          'babbage'
        ]),
        max_tokens: faker.datatype.number(2048)
      }
    })
  }
  return conversations
}
