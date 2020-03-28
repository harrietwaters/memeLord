import * as Discord from 'discord.js'
import { isMemeLord } from '../lib/util'
import { MemeLordPosts } from '../models'

const commandHandler: Discord.MessageHandler = {
  event: 'message',
  handler: async function (message: Discord.Message): Promise<void> {
    if (isMemeLord(message)) return
    if (message.cleanContent.includes('http')) return

    const shuffledCommands = shuffle(message.client.commands)
    for (const command of shuffledCommands) {
      const shouldTrigger: boolean = await command.trigger(message, { client: message.client })
      if (shouldTrigger) {
        console.log(`acting on command '${command.name}' for message \`${message.content}\``)

        // Let's grab the message that we sent (if we did send one)
        const msg: Discord.Message = await command.execute(message, { client: message.client }) as Discord.Message

        await MemeLordPosts.create({
          command: command.name,
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

function shuffle (commands: Discord.Command[]): Discord.Command[] {
  const shuffledCommands: Discord.Command[] = commands
  for (let i = 0; i < shuffledCommands.length; i += 1) {
    const shuffleIndex = Math.floor(Math.random() * shuffledCommands.length)
    const temp = shuffledCommands[shuffleIndex]

    shuffledCommands[shuffleIndex] = shuffledCommands[i]
    shuffledCommands[i] = temp
  }

  return shuffledCommands
}

module.exports = commandHandler
