import * as Discord from 'discord.js'

const edf: Discord.RandomEvent = {
  name: 'EDF!',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('edf')
  },
  execute: async (message: Discord.Message): Promise<Discord.Message> => {
    return message.channel.send('EDF! EDF!! EDF!!!')
  }
}

module.exports = edf
