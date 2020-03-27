import * as Discord from 'discord.js'

const peteRat: Discord.Command = {
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
