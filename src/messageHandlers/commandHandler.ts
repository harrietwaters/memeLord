import * as Discord from 'discord.js'
import { isMemeLord } from '../lib/util'
import { MemeLordPost } from '../models'

const commandHandler: Discord.MessageHandler = {
  event: 'message',
  handler: async function (message: Discord.Message): Promise<void> {
    // Don't response to MemeLord stuff, we don't want loops
    if (isMemeLord(message)) return
    // Don't do links, that's lame
    if (message.cleanContent.includes('http')) return
    // If it's got an attachment, don't even bother!
    if (message.attachments.size > 0) return

    for (const command of message.client.commands) {
      const shouldTrigger: boolean = await command.trigger(message, { client: message.client })
      if (shouldTrigger) {
        console.log(`acting on command '${command.name}' for message \`${message.content}\``)

        // Let's grab the message that we sent (if we did send one)
        const msg: Discord.Message = await command.execute(message, { client: message.client }) as Discord.Message

        await MemeLordPost.create({
          command: command.name,
          triggerMessage: message.cleanContent,
          triggerResponse: msg != null ? msg.cleanContent : '',
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          attachmentUrl: msg != null ? msg?.attachments[0]?.url || 'no attatchement' : 'no attatchement'
        })

        return
      }
    }

    const shuffledEvents = shuffle(message.client.randomEvents)

    for (const randomEvent of shuffledEvents) {
      const shouldTrigger: boolean = await randomEvent.trigger(message, { client: message.client })
      if (shouldTrigger) {
        console.log(`acting on command '${randomEvent.name}' for message \`${message.content}\``)

        // Let's grab the message that we sent (if we did send one)
        const msg: Discord.Message = await randomEvent.execute(message, { client: message.client }) as Discord.Message

        await MemeLordPost.create({
          command: randomEvent.name,
          triggerMessage: message.cleanContent,
          triggerResponse: msg != null ? msg.cleanContent : '',
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          attachmentUrl: msg != null ? msg?.attachments[0]?.url || 'no attatchement' : 'no attatchement'
        })

        return
      }
    }
  }
}

function shuffle (commands: Discord.RandomEvent[]): Discord.RandomEvent[] {
  const shuffledCommands: Discord.RandomEvent[] = commands
  for (let i = 0; i < shuffledCommands.length; i += 1) {
    const shuffleIndex = Math.floor(Math.random() * shuffledCommands.length)
    const temp = shuffledCommands[shuffleIndex]

    shuffledCommands[shuffleIndex] = shuffledCommands[i]
    shuffledCommands[i] = temp
  }

  return shuffledCommands
}

module.exports = commandHandler
