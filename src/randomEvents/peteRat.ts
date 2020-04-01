import * as Discord from 'discord.js'

const peteRat: Discord.RandomEvent = {
  name: 'Pete Rat',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('pete')
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    await message.react('🐀')
  }
}

module.exports = peteRat
