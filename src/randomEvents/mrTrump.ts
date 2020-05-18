import * as Discord from 'discord.js'

const mrTrump: Discord.RandomEvent = {
  name: 'Mr. Trump',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('trump')
  },
  execute: async (message: Discord.Message): Promise<void> => {
    await message.react('🇺🇸')
  }
}

export default mrTrump
