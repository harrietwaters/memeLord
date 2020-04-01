import * as Discord from 'discord.js'
import { getNouns } from '../lib/parseMsg'
import { odds } from '../lib/util'

const buttBot: Discord.RandomEvent = {
  name: 'Butt Bot',
  trigger: async (message: Discord.Message, args: {client: Discord.Client}): Promise<boolean> => {
    if (!odds(1, 100)) return false

    // Extract nouns
    const pos = await getNouns(message.content)

    // Let's only do it if there's 2 or more
    if (pos.length > 1) {
      return true
    }
    return false
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    // Get our nouns
    const pos = await getNouns(message.content)

    // Pick the one that will become a 'butt'
    const buttNoun = pos[Math.floor(Math.random() * pos.length)]

    // Replace
    const buttMessage = message.content.replace(buttNoun, 'butt')

    // At that mf'er
    return message.channel.send(`<@${message.author.id}> ${buttMessage}`)
  }
}

module.exports = buttBot
