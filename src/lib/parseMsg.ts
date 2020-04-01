import WordPOS from 'wordpos'
const wordpos = new WordPOS()

// eslint-disable-next-line @typescript-eslint/promise-function-async
export function getNouns (str: string): Promise<string[]> {
  return wordpos.getNouns(str)
}
