const fs = require('fs')
const path = require('path')

function genCommand(commandName){
    const eventText =  `import * as Discord from 'discord.js'

const COMMAND = '!${commandName}'

const ${commandName}: Discord.Command = {
  name: '${commandName}',
  description: 'Put a helpful description here!',
  example: '!${commandName}',
  trigger: (message: Discord.Message): boolean => {
    return message.content.toLowerCase().startsWith(COMMAND)
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    return message.channel.send('eat my shorts!')
  }
}

module.exports = ${commandName}
`

    fs.writeFileSync(path.join(process.cwd(), 'src', 'commands', `${commandName}.ts`), eventText)
}

genCommand(process.argv[2])