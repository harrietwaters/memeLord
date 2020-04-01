const fs = require('fs')
const path = require('path')

function genEvent(eventName){
    const eventText =  `import * as Discord from 'discord.js'

const ${eventName}: Discord.RandomEvent = {
  name: '${eventName}',
  trigger: async (message: Discord.Message): Promise<boolean> => {
    // Put your trigger in here!
    const val = await Promise.resolve(false)
    return val
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    return message.channel.send('eat my shorts!')
  }
}

module.exports = ${eventName}
`

    fs.writeFileSync(path.join(process.cwd(), 'src', 'randomEvents', `${eventName}.ts`), eventText)
}

genEvent(process.argv[2])