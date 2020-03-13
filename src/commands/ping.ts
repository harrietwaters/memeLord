import * as Discord from "discord.js";

export const ping = {
    name: 'ping',
    description: 'Ping!',
    trigger: (message: Discord.Message): Boolean => {
        return message.content.toLowerCase().startsWith('ping');
    },
    execute: (message: Discord.Message, args) => {
        message.channel.send('boioioing');
    }
}