/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-11.
 */

import {
  PROMPT_SHORTCUTS_JSON_REMOTE,
  PROMPT_SHORTCUTS_JSON_RESOURCE_OFFICAL
} from '@src/config'
import { logInfo } from './logger'

export async function fetchResourcePromptShortcuts(): Promise<
  Array<ResourcePromptInfo>
> {
  const payload = {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
  try {
    const response = await fetch(
      PROMPT_SHORTCUTS_JSON_REMOTE,
      payload
    )
    logInfo(
      'Fetch prompt shortcuts from remote',
      PROMPT_SHORTCUTS_JSON_REMOTE
    )
    if (response.status === 404) {
      logInfo(
        'Fetch prompt shortcuts from remote failed, use Official resource',
        PROMPT_SHORTCUTS_JSON_RESOURCE_OFFICAL
      )
      const backupResponse = await fetch(
        PROMPT_SHORTCUTS_JSON_RESOURCE_OFFICAL,
        payload
      )
      return (await backupResponse.json()) as Array<ResourcePromptInfo>
    }
    return (await response.json()) as Array<ResourcePromptInfo>
  } catch (error) {
    logInfo('getPromptShortCuts error', error)
    return Promise.reject(error)
  }
}

/**
 * 替换is 'xxx'为标准占位符[xxx]
 * @param prompt
 * @returns
 */
export const parseResourcePromptPlaceholder = (prompt: string) => {
  const _prompt = prompt.replace(
    /(is|是|Is|IS|iS)\s*'([^']+)'/g,
    '[$2]'
  )
  return _prompt
}

export interface ResourcePromptInfo {
  title: string
  description: string
  desc_cn: string
  remark: string
  title_en: string
  desc_en: string
  remark_en: string
  preview: string | null
  website: string | null
  source: string | null
  weight?: number
  tags: ResourcePromptTagType[]
  id: number
}

export type ResourcePromptTag = {
  name: ResourcePromptTagType
  label: string
  color: string
}

export const ResourcePromptTagColors = {
  all: '#ff6666',
  favorite: '#ffcc00',
  write: '#00bfff',
  article: '#3399ff',
  code: '#00cc99',
  ai: '#ff9900',
  living: '#66cc66',
  interesting: '#ff6699',
  life: '#66ccff',
  social: '#9966cc',
  philosophy: '#996633',
  mind: '#cc99cc',
  pedagogy: '#ff99cc',
  academic: '#99ccff',
  games: '#ff0000',
  tool: '#6699cc',
  interpreter: '#cc99ff',
  language: '#cccc00',
  new: '#6600cc',
  latest: '#cc6600',
  speech: '#ff3300',
  comments: '#660066',
  text: '#66cccc',
  company: '#cc66cc',
  seo: '#669933',
  doctor: '#cc6666',
  finance: '#9999cc',
  music: '#cc0099',
  professional: '#cc99ff',
  contribute: '#99cc99',
  personal: '#cc99cc'
}

export type ResourcePromptTagType =
  | 'favorite'
  | 'latest'
  | 'write'
  | 'article'
  | 'code'
  | 'ai'
  | 'living'
  | 'interesting'
  | 'life'
  | 'social'
  | 'philosophy'
  | 'mind'
  | 'pedagogy'
  | 'academic'
  | 'games'
  | 'tool'
  | 'interpreter'
  | 'language'
  | 'speech'
  | 'comments'
  | 'text'
  | 'company'
  | 'seo'
  | 'doctor'
  | 'finance'
  | 'music'
  | 'professional'
  | 'contribute'
  | 'new'
  | 'personal'

export const ResourcePromptTagTypes: string[] = [
  'new',
  'latest',
  'favorite',
  'write',
  'article',
  'code',
  'ai',
  'living',
  'interesting',
  'life',
  'social',
  'philosophy',
  'mind',
  'pedagogy',
  'academic',
  'games',
  'tool',
  'interpreter',
  'language',
  'speech',
  'comments',
  'text',
  'company',
  'seo',
  'doctor',
  'finance',
  'music',
  'professional',
  'contribute',
  'personal'
]
