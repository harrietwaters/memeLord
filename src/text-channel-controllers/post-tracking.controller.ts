box
import { DiscordContext, DiscordEvent } from '@harold-waters/discord-nestjs-transport';
import { Body, Controller } from '@nestjs/common';
import { Ctx } from '@nestjs/microservices';
import * as Discord from 'discord.js';
import { getRepository, In, LessThan, Repository } from 'typeorm';
import { Point } from '../models/point.entity';
import { ShitPost } from '../models/shit-post.entity';
import { Hasher } from '../utilities/hasher';

@Controller()
export class PostTrackingController {
    private readonly hasher: Hasher;

    constructor(hasher: Hasher) {
        this.hasher = hasher;
    }

    @DiscordEvent('message', { allowEmptyMessage: true })
    public async savePost(@Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        const shitPostRepository = getRepository(ShitPost);
        await Promise.all(
            message.attachments.map(async m => {
                const shitPost = shitPostRepository.create({
                    authorId: message.author.id,
                    messageContent: message.cleanContent,
                    imageHash: await this.hasher.hashAttachment(m)
                });
                return shitPostRepository.save(shitPost);
            })
        );
    }

    @DiscordEvent('messageReactionAdd')
    public async scoreMeme(@Ctx() ctx: DiscordContext<'messageReactionAdd'>) {
        const react = ctx.getArgByIndex(0);
        const message = react.message;
        if (react.me) return;
        if (message.attachments.size < 1) return;

        const pointRepository: Repository<Point> = getRepository(Point);
        const point = pointRepository.create({
            authorId: message.author.id,
            messageId: message.id
        });

        await pointRepository.save(point);
    }

    @DiscordEvent('message')
    public async checkMemeCrime(@Body() content: string, @Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
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
                // A one minute window is left open for meme crimes
                // This will allow for meme heists to be carried out by a skilled crew
                datetime: LessThan(Date.now() - 60 * 1000)
            },
            order: {
                datetime: 'DESC'
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
