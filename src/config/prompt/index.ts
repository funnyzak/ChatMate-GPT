/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-16.
 * Used for initializing Converstation examples.
 */

import { LanguageTagType } from '@src/i18n'
import enUS from './prompt.en-US.json'
import zhCN from './prompt.zh-CN.json'
import zhTW from './prompt.zh-TW.json'

export interface PromptInfo {
  title: string
  description: string
  prompt: string
}
export const Prompts = {
  'en-US': enUS.prompts as PromptInfo[],
  'zh-TW': zhTW.prompts as PromptInfo[],
  'zh-CN': zhCN.prompts as PromptInfo[]
}
export const getPrompts = (lang: LanguageTagType) => {
  return Object.keys(Prompts).indexOf(lang) >= 0
    ? Prompts[lang as keyof typeof Prompts]
    : Prompts['en-US']
}
