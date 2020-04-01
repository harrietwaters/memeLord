import * as Discord from 'discord.js'

const smolDog: Discord.RandomEvent = {
  name: 'smolDog',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('small') && lowerMsg.includes('dog')
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    return message.channel.send('SMOL DOG')
  }
}

module.exports = smolDog
