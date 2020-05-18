import * as Discord from 'discord.js'
import { Point } from '../models/point'
import { SortingHatUser, MemeHouse } from '../models'
import { Sequelize, Op } from 'sequelize'
import * as Canvas from 'canvas'

const COMMAND = '!getScores'

const getScores: Discord.Command = {
  name: '!getScores',
  description: 'Get current meme scores',
  example: COMMAND,
  trigger: (message: Discord.Message): boolean => {
    return message.content.startsWith(COMMAND)
  },
  execute: async (message: Discord.Message): Promise<Discord.Message> => {
    const places = ['1st', '2nd', '3rd', '4th']
    const monday = new Date()
    monday.setDate(monday.getDate() - (monday.getDate() + 6))

    const points = await Point.findAll({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('point')), 'points']],
      include: [{
        model: SortingHatUser,
        attributes: ['memeHouseId'],
        include: [{
          model: MemeHouse,
          attributes: ['name', 'houseImage']
        }]
      }],
      where: {
        createdAt: {
          [Op.gte]: monday
        }
      },
      group: ['SortingHatUser.MemeHouse.id'],
      order: [[Sequelize.col('points'), 'DESC']]
    })

    const size = 250

    const canvas = Canvas.createCanvas(size * 2, size * 2)
    const ctx = canvas.getContext('2d')

    const textSize = 48
    ctx.font = `${textSize}px impact`
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2

    let pos = 0

    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < 2; j += 1) {
        const xMod = j * size
        const yMod = i * size
        const score: number = points[pos].get('points') as number
        const houseName = points[pos].get('SortingHatUser').get('MemeHouse').name
        const imageName = points[pos].get('SortingHatUser').get('MemeHouse').houseImage
        const image = await Canvas.loadImage(`images/${imageName}`)

        ctx.textAlign = 'center'

        ctx.drawImage(image, xMod, yMod, size, size)

        ctx.fillText(houseName, xMod + size / 2, yMod + size - 10, size - 10)
        ctx.strokeText(houseName, xMod + size / 2, yMod + size - 10, size - 10)

        ctx.fillText(places[pos], xMod + size / 2, yMod + (size / 4), size - 10)
        ctx.strokeText(places[pos], xMod + size / 2, yMod + (size / 4), size - 10)

        ctx.fillText(score.toString(), xMod + size / 2, yMod + (size / 1.5), size - 10)
        ctx.strokeText(score.toString(), xMod + size / 2, yMod + (size / 1.5), size - 10)

        pos++
      }
    }

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'scores.jpg')
    return message.channel.send(attachment)
  }
}

export default getScores
