import { Injectable } from '@nestjs/common';
import { In, getRepository, LessThan } from 'typeorm';
import * as Discord from 'discord.js';

import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { IgnoreMemeLord } from 'src/common/decorators';
import { Hasher } from 'src/utilities/hasher';
import { ShitPost } from 'src/models/shit-post.entity';

@Injectable()
export class MemeCrimeService {
    private readonly hasher: Hasher;

    constructor(client: DiscordClient, hasher: Hasher) {
        client.addListener('message', this.listener.bind(this));
        this.hasher = hasher;
    }

    @IgnoreMemeLord()
    public async listener(message: DiscordMessage): Promise<void> {
        if (message.attachments.size === 0) return;
        const shitPostRepository = getRepository(ShitPost);
        const hashMap: Map<string, Discord.MessageAttachment> = new Map();

        for (const [, attachment] of message.attachments) {
            hashMap.set(await this.hasher.hashAttachment(attachment), attachment);
        }

        const memeCrimeVictim: ShitPost = await shitPostRepository.findOne({
            select: ['authorId', 'imageHash'],
            where: {
                imageHash: In(Array.from(hashMap.keys())),
                // A half second window is left open for meme crimes
                // This will be important for any planned meme heists
                dateTime: LessThan(Date.now() - 500)
            },
            order: {
                dateTime: 'DESC'
            }
        });

        if (!memeCrimeVictim) return;

        const embed = new Discord.MessageEmbed()
            .setAuthor('Meme Police')
            .setColor('#ff001e')
            .setTitle('A MEME CRIME HAS BEEN COMITTED')
            .setDescription(`<@${message.author.id}> HAS COMMITTED A GRAVE SIN`)
            .addField('THE AGGRIVED PARTY', `<@${memeCrimeVictim.authorId}>`, true)
            .setImage(hashMap.get(memeCrimeVictim.imageHash).url);

        await message.channel.send(embed);
    }
}
