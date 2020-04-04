import * as Discord from 'discord.js'

const gundamLike: Discord.RandomEvent = {
  name: 'Gundam Like',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('gundam')
  },
  execute: async (message: Discord.Message): Promise<void> => {
    await message.react('👍')
  }
}

module.exports = gundamLike
