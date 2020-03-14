import * as Discord from "discord.js";
import { Command } from "../interfaces";

const gundamLike: Command = {
    name: 'Gundam Like',
    description: 'Like any post with \'gundam\' in it',
    trigger: (message: Discord.Message): Boolean => {
        const lowerMsg = message.content.toLowerCase()
        return lowerMsg.includes('gundam');
    },
    execute: async (message: Discord.Message, args): Promise<void> => {
        await message.react('👍')
    }
}

module.exports = gundamLike;