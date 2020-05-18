import * as Discord from 'discord.js'
import { odds } from '../lib/util'

const noU: Discord.RandomEvent = {
  name: 'No U',
  trigger: (message: Discord.Message): boolean => {
    const lowerContent = message.content.toLowerCase()
    if (!odds(1, 10) && lowerContent.startsWith('you')) return false
    return false
  },
  execute: async (message: Discord.Message): Promise<Discord.Message> => {
    return message.channel.send(`<@${message.author.id}> no u`)
  }
}

export default noU
