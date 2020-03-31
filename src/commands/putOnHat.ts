import * as Canvas from 'canvas'
import * as Discord from 'discord.js'
import {
  MemeHouse,
  SortingHatUser
} from '../models'
import { odds } from '../lib/util'

const COMMAND = '!putOnSortingHat'

const putOnHat: Discord.Command = {
  name: 'Put On Sorting Hat',
  description: 'Places a sorting hat on the Memer',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.startsWith(COMMAND.toLowerCase())
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    const houses = await MemeHouse.findAll({ include: [SortingHatUser] })

    // First let's find our smallest houses
    const houseIds: number[] = []
    let smallestHouseIds: number[] = []
    let lowestCount: number = 0

    for (const house of houses) {
      const houseSize = house.get('SortingHatUsers').length
      if (houseSize === lowestCount) {
        smallestHouseIds.push(house.get('id'))
      }
      if (houseSize < lowestCount) {
        lowestCount = houseSize
        smallestHouseIds = [house.get('id')]
      }
      houseIds.push(house.get('id'))
    }

    const chosenHouse: number = smallestHouseIds[Math.floor(Math.random() * smallestHouseIds.length)]

    // Because wonder should exist in this world lets also have the opportunity to land in ANY house
    const luckyHouse: number = houseIds[Math.floor(Math.random() * houseIds.length)]

    const user = await SortingHatUser.findOne({
      where: {
        author: message.author.id
      }
    })

    const newHouse = await MemeHouse.findOne({
      where: {
        id: odds(1, 10) ? chosenHouse : luckyHouse
      }
    })

    if (newHouse == null) {
      return message.channel.send('Something went way bad')
    }

    if (user == null) {
      await SortingHatUser.create({
        author: message.author.id,
        memeHouseId: newHouse.get('id')
        // @ts-ignore
      }, { include: MemeHouse })
    } else {
      const DAY_IN_MILLISECONDS = 86400000
      const now = Date.now()
      const lastUpdate = user.get('updatedAt').getTime()

      if (now - lastUpdate < DAY_IN_MILLISECONDS) {
        return message.channel.send(`Too soon, <@${message.author.id}>! Try again tomorrow!`)
      } else {
        await user.update({
          memeHouseId: newHouse.get('id')
        })
      }
    }

    const attachment = await createHouseImage(newHouse)
    return message.channel.send(`Congrats, <@${message.author.id}>! You're now a member of ${newHouse.get('name')}`, attachment)
  }
}

async function createHouseImage (house: MemeHouse): Promise<Discord.MessageAttachment> {
  const canvas = Canvas.createCanvas(480, 480)
  const ctx = canvas.getContext('2d')

  const background = await Canvas.loadImage(`images/${house.get('houseImage')}`)
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  ctx.font = '48px impact'
  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#000000'

  // Actually fill the text with a solid color
  const x = 240
  const y = 410
  const maxWidth = 400
  ctx.textAlign = 'center'

  ctx.fillText(house.get('name'), x, y, maxWidth)
  ctx.strokeText(house.get('name'), x, y, maxWidth)
  return new Discord.MessageAttachment(canvas.toBuffer(), 'house.jpg')
}

module.exports = putOnHat
