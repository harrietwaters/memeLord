import * as Discord from 'discord.js'
import * as fs from 'fs'
import { Command } from '../interfaces'

export const coolAbed: Command = {
  name: 'Cool Abed',
  description: 'Cool. Cool Cool Cool.',
  trigger: (message: Discord.Message): boolean => {
    const lowerContent = message.content.toLowerCase()
    const coolCount = lowerContent
      .split(' ')
      .filter((w) => w.includes('cool') || w.includes('🆒'))
    if (coolCount.length > 2) return true
    if (lowerContent.startsWith('🆒🆒🆒')) return true
    return false
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    const coolAbedGif = fs.readFileSync('images/coolAbed.gif')
    const attachment = new Discord.MessageAttachment(coolAbedGif, 'coolAbed.gif')
    await message.channel.send(`<@${message.author.id}>`, attachment)
  }
}

module.exports = coolAbed
