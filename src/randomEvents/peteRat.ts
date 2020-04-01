import * as Discord from 'discord.js'

const peteRat: Discord.RandomEvent = {
  name: 'Pete Rat',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.split(' ').includes('pete')
  },
  execute: async (message: Discord.Message): Promise<void> => {
    await message.react('🐀')
    await message.react('🍞')
    await message.react('📈')
  }
}

module.exports = peteRat
