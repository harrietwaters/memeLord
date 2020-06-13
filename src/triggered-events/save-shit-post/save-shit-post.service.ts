import { Injectable } from '@nestjs/common';

import { DiscordClient, DiscordMessage } from '../../discord/discord-client';
import { IgnoreMemeLord } from '../../common/decorators';
import { Hasher } from '../../utilities/hasher';
import { getRepository } from 'typeorm';
import { ShitPost } from '../../models/shit-post.entity';

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
                    authorId: message.author.id,
                    messageContent: message.cleanContent,
                    imageHash: await this.hasher.hashAttachment(m)
                });
            })
        );
    }
}
