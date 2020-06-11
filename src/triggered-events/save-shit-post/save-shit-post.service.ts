import { Injectable } from '@nestjs/common';

import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { IgnoreMemeLord } from 'src/common/decorators';
import { Hasher } from 'src/utilities/hasher';
import { getRepository } from 'typeorm';
import { ShitPost } from 'src/models/shit-post.entity';

@Injectable()
export class SaveShitPostService {
    private readonly hasher: Hasher;
    constructor(client: DiscordClient, hasher: Hasher) {
        client.addListener('message', this.listener.bind(this));
        this.hasher = hasher;
    }

    @IgnoreMemeLord()
    public async listener(message: DiscordMessage): Promise<void> {
        const shitPostRepository = getRepository(ShitPost);
        await Promise.all(
            message.attachments.map(async m => {
                return shitPostRepository.insert({
                    author: m.id,
                    messageContent: message.cleanContent,
                    imageHash: await this.hasher.hashAttachment(m)
                });
            })
        );
    }
}
