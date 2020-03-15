import * as Discord from 'discord.js'
import { Command } from '../interfaces'
import { odds } from '../lib/util'

const noU: Command = {
  name: 'No U',
  description: 'No U!!!!',
  trigger: (message: Discord.Message): boolean => {
    const lowerContent = message.content.toLowerCase()
    if (odds(1, 5) && lowerContent.startsWith('you')) return true
    return false
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    await message.channel.send(`<@${message.author.id}> no u`)
  }
}

module.exports = noU
