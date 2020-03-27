import * as Discord from 'discord.js'

const edf: Discord.Command = {
  name: 'EDF!',
  description: 'EDF! EDF!! EDF!!!',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('edf')
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    return message.channel.send('EDF! EDF!! EDF!!!')
  }
}

module.exports = edf
