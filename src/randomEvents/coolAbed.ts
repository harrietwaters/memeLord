import * as Discord from 'discord.js'
import * as fs from 'fs'

const coolAbed: Discord.RandomEvent = {
  name: 'Cool Abed',
  trigger: (message: Discord.Message): boolean => {
    const lowerContent = message.content.toLowerCase()

    // Split out any cools or cool emojis
    const coolCount = lowerContent
      .split(' ')
      .filter((w) => w.includes('cool') || w.includes('🆒'))

    // If we've got three or more (think: Cool. Cool, Cool) then hit 'em ol' Abed
    if (coolCount.length > 2) return true

    // I often use the emoji - so let's cover my special case ;)
    if (lowerContent.startsWith('🆒🆒🆒')) return true

    return false
  },
  execute: async (message: Discord.Message): Promise<Discord.Message> => {
    const coolAbedGif = fs.readFileSync('images/coolAbed.gif')
    const attachment = new Discord.MessageAttachment(coolAbedGif, 'coolAbed.gif')
    return message.channel.send(`<@${message.author.id}>`, attachment)
  }
}

export default coolAbed
