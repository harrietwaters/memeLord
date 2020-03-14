import * as Discord from "discord.js";
import { Command } from "../interfaces";

const mrTrump: Command = {
    name: 'Mr. Trump',
    description: 'Bless You Mr. Trump',
    trigger: (message: Discord.Message): Boolean => {
        const lowerMsg = message.content.toLowerCase()
        return lowerMsg.includes('trump');
    },
    execute: async (message: Discord.Message, args): Promise<void> => {
        await message.react('🇺🇸')
    }
}

module.exports = mrTrump;