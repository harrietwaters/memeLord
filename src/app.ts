import * as Discord from 'discord.js'

import commands from './commands'
import randomEvents from './randomEvents'
import handlers from './messageHandlers'

const client = new Discord.Client()

client.on('ready', (): void => {
  client.commands = commands
  client.randomEvents = randomEvents

  for (const handler of handlers) {
    client.on(handler.event, handler.handler)
  }

  console.log('I am ready for memes!')
})

client.login(process.env.CLIENT_TOKEN)
  .then(_ => {
    console.log('I am logged in!')
  })
  .catch(err => {
    console.log(err)
  })
