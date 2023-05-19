/**
 * Created by Leon<silenceace@gmail.com> at 2023-05-05.
 */

import { logInfo } from '@src/helper/logger'
import { AccountAPI, ChatMateAPI } from '@src/types'
import {
  CreateAccountBillingUsageRequest,
  CreateAccountBillingUsageResponse,
  CreateAccountSubscriptionResponse
} from '@src/utils/openai-api'
export default (api: ChatMateAPI): AccountAPI => ({
  createAccountBillingUsage: async (
    createAccountBillingUsage: CreateAccountBillingUsageRequest,
    apikey?: string
  ): Promise<CreateAccountBillingUsageResponse> => {
    const response = await api.openai!.createAccountBillingUsage(
      createAccountBillingUsage,
      {
        ...api.axiosConfig,
        ...(!apikey
          ? {}
          : { headers: { Authorization: `Bearer ${apikey}` } })
      }
    )
    logInfo('CreateAccountBillingUsage', JSON.stringify(response))
    const data = api.returnOrError(response)
    if (data instanceof Error) throw data
    return data
  },
  createAccountSubscription: async (
    apikey?: string
  ): Promise<CreateAccountSubscriptionResponse> => {
    const response = await api.openai!.createAccountSubscription({
      ...api.axiosConfig,
      ...(!apikey
        ? {}
        : { headers: { Authorization: `Bearer ${apikey}` } })
    })
    logInfo('CreateAccountSubscription', JSON.stringify(response))
    const data = api.returnOrError(response)
    if (data instanceof Error) throw data
    return data
  }
})
