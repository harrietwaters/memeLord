import * as fs from 'fs'
import * as Discord from 'discord.js'

const client = new Discord.Client()

client.on('ready', async (): Promise<void> => {
  client.commands = []

  const extRegex = /.+\.[tj]s$/g

  const commandFiles: string[] = fs.readdirSync(`${__dirname}/commands/`).filter(file => file.match(extRegex))
  const handlerFiles: string[] = fs.readdirSync(`${__dirname}/messageHandlers/`).filter(file => file.match(extRegex))

  for (const file of commandFiles) {
    const commandFile: Discord.Command = await import(`${__dirname}/commands/${file}`)
    client.commands.push(commandFile)
  }

  for (const file of handlerFiles) {
    const handlerFile: Discord.MessageHandler = await import(`${__dirname}/messageHandlers/${file}`)
    // @ts-ignore
    client.on(handlerFile.event, handlerFile.handler)
  }

  console.log('I am ready for memes!')
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
client.login(process.env.CLIENT_TOKEN)
