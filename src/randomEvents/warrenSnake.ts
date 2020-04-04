import * as Discord from 'discord.js'

const warrenSnake: Discord.RandomEvent = {
  name: 'Warren Snake',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.split(' ').includes('warren')
  },
  execute: async (message: Discord.Message): Promise<void> => {
    await message.react('🐍')
  }
}

module.exports = warrenSnake
