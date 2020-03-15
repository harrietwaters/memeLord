import * as Discord from 'discord.js'
import { Command } from '../interfaces'
import { getNouns } from '../parseMsg'
import { odds } from '../lib/util'

const buttBot: Command = {
  name: 'Butt Bot',
  description: 'Finds a noun and swaps it with butt',
  trigger: async (message: Discord.Message, args: {client: Discord.Client}): Promise<boolean> => {
    if (odds(1, 50)) return false

    // Extract nouns
    const pos = await getNouns(message.content)

    // Let's only do it if there's 2 or more
    if (pos.length > 1) {
      return true
    }
    return false
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    // Get our nouns
    const pos = await getNouns(message.content)

    // Pick the one that will become a 'butt'
    const buttNoun = pos[Math.floor(Math.random() * pos.length)]

    // Replace
    const buttMessage = message.content.replace(buttNoun, 'butt')

    // At that mf'er
    await message.channel.send(`<@${message.author.id}> ${buttMessage}`)
  }
}

module.exports = buttBot
