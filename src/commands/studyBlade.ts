import * as Discord from 'discord.js'
import * as Canvas from 'canvas'
import { Command } from '../interfaces'
import { getNouns } from '../parseMsg'
import { odds } from '../lib/util'

export const studyBlade: Command = {
  name: 'Study Blade',
  description: 'While you were having premarital sex I wrote this command and now you have the audacity to come to me for a description?',
  trigger: async (message: Discord.Message): Promise<boolean> => {
    if (odds(1, 100)) return false

    // Extract nouns
    const pos = await getNouns(message.content)

    // Let's only do it if there's 2 or more
    if (pos.length > 2) {
      return true
    }
    return false
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    const pos = await getNouns(message.content)
    const canvas = Canvas.createCanvas(680, 510)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage('images/shrekBlade.jpg')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = '20px book-antiqua'
    ctx.fillStyle = '#000000'

    // Actually fill the text with a solid color
    ctx.fillText('When you were partying I\nstudied the', 10, 20)
    ctx.fillText('When you were having premarital\nsex I mastered the', 10, 85)
    ctx.fillText('While you wasted your days\nat the gym in pursuit of vanity I\ncultivated', 10, 145)
    ctx.fillText('And now that the world is\non fire and the bardbarians\nare at the gate you have the\naudacity to come to me\nfor help?', 10, 230)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#9c0000'

    ctx.fillText(` ${pos[0]}`, 125, 45)
    ctx.fillText(`${pos[1]}`, 200, 110)
    ctx.fillText(`${pos[2]}`, 120, 194)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'shrekBlade.jpg')
    await message.channel.send(`<@${message.author.id}>`, attachment)
  }
}

module.exports = studyBlade
