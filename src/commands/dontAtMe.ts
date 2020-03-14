import * as Discord from 'discord.js'
import { Command } from '../interfaces'

const dontAtMe: Command = {
  name: 'dontAtMe',
  description: 'Calls out those who do not wish to be atted',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    const triggerWords = ['don\'t at me', 'don\'t @ me', 'dont at me', 'dont @ me']

    for (const word of triggerWords) {
      if (lowerMsg.includes(word)) return true
    }

    return false
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    await message.channel.send(`<@${message.author.id}> ur a little bitch`)
  }
}

module.exports = dontAtMe
