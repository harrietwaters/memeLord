import * as Discord from 'discord.js'
import { Command } from '../interfaces'

const peteRat: Command = {
  name: 'Pete Rat',
  description: 'Pete is a rat',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('pete')
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    await message.react('🐀')
  }
}

module.exports = peteRat
