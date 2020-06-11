// TODO: Type this in the Discord service
import * as Discord from 'discord.js';

import * as crypto from 'crypto';
import * as https from 'https';
import * as url from 'url';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Hasher {
    public async hashAttachment(attachment: Discord.MessageAttachment): Promise<string> {
        return new Promise(resolve => {
            const attachementUrl: url.URL = new url.URL(attachment.url);

            const hash: crypto.Hash = crypto.createHash('sha256');

            https.get(attachementUrl, res => {
                // I don't get to use pipes often enough - much less hash pipes!
                res.pipe(hash);
                res.on('end', () => {
                    hash.end();
                    resolve(hash.digest('hex'));
                });
            });
        });
    }
}
