import * as Discord from 'discord.js'

export const help: Discord.Command = {
  name: '!help',
  description: 'Lists out commands, with descriptions and examples',
  example: '!help',
  trigger: (message: Discord.Message): boolean => {
    // Put your trigger in here!
    return message.content.startsWith('!help')
  },
  execute: async (message: Discord.Message): Promise<Discord.Message> => {
    let msg = ''

    for (const command of message.client.commands) {
      msg = msg.concat(`*${command.name}*
    Description: ${command.description}
    Example: ${command.example}
`)
    }
    return message.channel.send(msg)
  }
}

export default help
