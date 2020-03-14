
import * as crypto from 'crypto';
import * as https from 'https'
import * as url from 'url'

export function hashAttachment(attachment: any): Promise<string>{
  return new Promise((resolve) => {
    let attachementUrl: url.UrlWithStringQuery;
    let hash: crypto.Hash;
    try{
      // According to spec, the hash might not be a string, put let's just throw
      // an error if it's not string
      attachementUrl = url.parse(attachment);
    } catch (err) {
      console.error(`attachment is not a valid URL: ${attachment}`)
      return;
    }

    hash = crypto.createHash('sha256')

    const req = https.get(attachementUrl, (res) => {
      res.pipe(hash)
      res.on('end', () => {
        hash.end()
        resolve(hash.digest('hex'))
      })
    });
  });
}