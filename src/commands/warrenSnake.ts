import * as Discord from 'discord.js'

const warrenSnake: Discord.Command = {
  name: 'Warren Snake',
  description: 'Warren is a snake',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('warren')
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    await message.react('🐍')
  }
}

module.exports = warrenSnake
