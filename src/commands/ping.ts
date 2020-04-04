import * as Discord from 'discord.js'

export const ping: Discord.Command = {
  name: '!ping',
  description: 'Ping!',
  example: '!ping',
  trigger: (message: Discord.Message): boolean => {
    return message.content.toLowerCase().startsWith('!ping')
  },
  execute: async (message: Discord.Message): Promise<Discord.Message> => {
    return message.channel.send('boioioing')
  }
}

export default ping
module.exports = ping
