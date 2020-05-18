import * as Discord from 'discord.js'

import commandHandler from './commandHandler'
import memeCrime from './memeCrime'
import memeScore from './memeScore'

const handlers: Array<Discord.MessageHandler | Discord.ReactHandler> = [
  commandHandler,
  memeCrime,
  memeScore
]

export default handlers
