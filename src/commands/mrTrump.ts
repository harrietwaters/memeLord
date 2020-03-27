import * as Discord from 'discord.js'

const mrTrump: Discord.Command = {
  name: 'Mr. Trump',
  description: 'Bless You Mr. Trump',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('trump')
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    await message.react('🇺🇸')
  }
}

module.exports = mrTrump
