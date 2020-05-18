import * as Discord from 'discord.js'
import { Point } from '../models/point'
import { isMemeLord } from '../lib/util'

const memeScorer: Discord.ReactHandler = {
  event: 'messageReactionAdd',
  handler: async function (react: Discord.MessageReaction): Promise<void> {
    const message = react.message
    // Don't response to MemeLord stuff, we don't want loops
    if (isMemeLord(message)) return
    // Don't do links, that's lame
    if (message.attachments.size < 1) return

    await Point.create({
      sortingHatUserId: message.author.id,
      messageId: message.id
    })
  }
}

export default memeScorer
