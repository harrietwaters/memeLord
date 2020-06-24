import * as Discord from 'discord.js';
import { getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { DiscordClient, DiscordMessage } from '../../discord/discord-client';
import { Point } from '../../models/point.entity';

@Injectable()
export class MemeScoreService {
    constructor(client: DiscordClient) {
        client.addListener('messageReactionAdd', this.listener.bind(this));
    }

    public async listener(react: Discord.MessageReaction): Promise<void> {
        const pointRepository: Repository<Point> = getRepository(Point);
        const message: DiscordMessage = react.message;
        // "Me" in this case refers to the client, a.k.a Memelord
        if (react.me) return;
        if (message.attachments.size < 1) return;

        const point = pointRepository.create({
            authorId: message.author.id,
            messageId: message.id
        });

        await pointRepository.save(point);
    }
}
