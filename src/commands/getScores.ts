import * as Discord from 'discord.js'
import { Point } from '../models/point'
// import { Op } from 'sequelize'
import { SortingHatUser } from '../models'

const COMMAND = '!getScores'

const getScores: Discord.Command = {
  name: '!getScores',
  description: 'Get current meme scores',
  example: COMMAND,
  trigger: (message: Discord.Message): boolean => {
    return message.content.startsWith(COMMAND)
  },
  execute: async (message: Discord.Message): Promise<Discord.Message> => {
    const monday = new Date()
    monday.setDate(monday.getDate() - (monday.getDate() + 6))

    const points = await Point.findAll({
      // where: {
      //   createdAt: {
      //     [Op.gte]: monday
      //   }
      // },
      include: [{
        model: SortingHatUser
      }],
      group: 'SortingHatUser.memeHouseId'
    })

    console.dir(points.map(p => p.toJSON()))
    return message.channel.send('foo')
  }
}

module.exports = getScores
