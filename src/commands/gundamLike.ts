import * as Discord from 'discord.js'

const gundamLike: Discord.Command = {
  name: 'Gundam Like',
  description: 'Like any post with \'gundam\' in it',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('gundam')
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    await message.react('👍')
  }
}

module.exports = gundamLike
