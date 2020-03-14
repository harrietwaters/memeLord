import * as Discord from 'discord.js'

const ping = {
  name: 'ping',
  description: 'Ping!',
  trigger: (message: Discord.Message): boolean => {
    return message.content.toLowerCase().startsWith('ping')
  },
  execute: async (message: Discord.Message, args): Promise<void> => {
    await message.channel.send('boioioing')
  }
}

module.exports = ping
