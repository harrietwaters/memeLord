import * as Discord from 'discord.js'

const smolDog = {
  name: 'smolDog',
  description: 'SMOL DOG!',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('small') && lowerMsg.includes('dog')
  },
  execute: async (message: Discord.Message, args) => {
    await message.channel.send('SMOL DOG')
  }
}

module.exports = smolDog
