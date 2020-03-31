import * as Discord from 'discord.js'
import * as Canvas from 'canvas'
import { odds } from '../lib/util'

const sPoNgEbOb: Discord.Command = {
  name: 'a sPonGe bOb mEmE',
  description: 'I don\'t want to do the capitalization thing anymore',
  trigger: (message: Discord.Message): boolean => {
    if (!odds(1, 100)) return false
    if (message.cleanContent.toLowerCase().includes('http')) return false
    if (message.cleanContent.toLowerCase().length > 1) return false
    if (message.cleanContent.toLowerCase().length < 32) return true
    return false
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    const mEsSaGge: string[] = []
    for (let i = 0; i + 1 <= message.cleanContent.length; i += 2) {
      mEsSaGge.push(message.cleanContent[i].toLowerCase())

      if (message.cleanContent[i + 1] == null) continue

      mEsSaGge.push(message.cleanContent[i + 1].toUpperCase())
    }

    const canvas = Canvas.createCanvas(680, 510)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage('images/sPoNgEbOb.jpeg')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = '72px impact'
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#000000'

    // Actually fill the text with a solid color
    const x = 340
    const y = 475
    const maxWidth = 650
    ctx.textAlign = 'center'

    ctx.fillText(mEsSaGge.join(''), x, y, maxWidth)
    ctx.strokeText(mEsSaGge.join(''), x, y, maxWidth)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sPoNgEbOb.jpg')
    return message.channel.send(`<@${message.author.id}>`, attachment)
  }
}

module.exports = sPoNgEbOb
