import * as Discord from 'discord.js'
import {
  MemeHouse,
  SortingHatUser
} from '../models'

const COMMAND = '!listHouses'

const listHouses: Discord.Command = {
  name: 'List Houes',
  description: 'List Houses and their Users',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.startsWith(COMMAND.toLowerCase())
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    const houses = await MemeHouse.findAll({ include: [SortingHatUser] })
    let msg: string = ''
    for (const house of houses) {
      const houseName: string = `${house.get('name')}\n`
      const users = house.get('SortingHatUsers')
      let userList: string = ''

      for (const user of users) {
        // @ts-ignore
        const snowflake = await message.client.users.resolveID(user.get('author'))

        if (snowflake == null) {
          return message.channel.send('you broke me :(')
        }

        const resolvedUser = await message.client.users.fetch(snowflake)

        userList = userList.concat(`\t* ${resolvedUser.username}\n`)
      }

      msg = msg.concat(houseName, userList)
    }

    return message.channel.send(msg)
  }
}

module.exports = listHouses
