/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-05.
 */

// https://platform.openai.com/tokenizer?view=bpe
import GPT3Tokenizer from 'gpt3-tokenizer'
export const gptTokenizerEncode = (
  str: string,
  type: 'gpt3' | 'codex' = 'gpt3'
) => {
  const tokenizer = new GPT3Tokenizer({ type })
  const encoded = tokenizer.encode(str)
  return encoded.bpe
}
export const gptTokenizerDecode = (
  tokens: number[],
  type: 'gpt3' | 'codex' = 'gpt3'
) => {
  const tokenizer = new GPT3Tokenizer({ type })
  const decoded = tokenizer.decode(tokens)
  return decoded
}
