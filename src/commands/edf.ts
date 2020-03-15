import * as Discord from 'discord.js'

const edf = {
  name: 'EDF!',
  description: 'EDF! EDF!! EDF!!!',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.includes('edf')
  },
  execute: async (message: Discord.Message, args) => {
    await message.channel.send('EDF! EDF!! EDF!!!')
  }
}

module.exports = edf
