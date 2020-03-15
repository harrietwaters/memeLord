
import * as crypto from 'crypto'
import * as https from 'https'
import * as url from 'url'

export async function hashAttachment (attachment: any): Promise<string> {
  return new Promise((resolve) => {
    const attachementUrl: url.URL = new url.URL(attachment)

    const hash: crypto.Hash = crypto.createHash('sha256')

    https.get(attachementUrl, (res) => {
      // I don't get to use pipes often enough - much less hash pipes!
      res.pipe(hash)
      res.on('end', () => {
        hash.end()
        resolve(hash.digest('hex'))
      })
    })
  })
}
