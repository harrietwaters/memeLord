import * as Discord from 'discord.js';
import { DiscordMessage } from '../../discord/discord-client';
import { CompletedHandlerResponse } from '../types';

export function ReplyWithReturn() {
    return function decorator(target, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        if (typeof original === 'function') {
            descriptor.value = async function(...args) {
                let message: DiscordMessage;
                if (Array.isArray(args[0])) {
                    message = args[1];
                } else if (typeof args[0] === 'string') {
                    message = args[1];
                } else {
                    message = args[0];
                }

                const result: CompletedHandlerResponse = await original.apply(this, args);
                switch (typeof result) {
                    case 'string':
                        return message.channel.send(result);
                    case 'object':
                        let reply: string = '';
                        let attachment: Discord.MessageAttachment | null = null;
                        if (result.attachment) {
                            attachment = new Discord.MessageAttachment(result.attachment);
                        }
                        if (result.reply) {
                            reply = result.reply;
                        }
                        return message.channel.send(reply, attachment);
                }
            };
        }
    };
}
