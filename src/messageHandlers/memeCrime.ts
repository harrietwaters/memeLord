import * as Discord from 'discord.js'
import { findMemeCriminal } from '../lib/findMemeCriminal'
import { hashAttachment } from '../lib/hashAttatchment'
import { ShitPost } from '../models'
import { isMemeLord } from '../lib/util'

const memeCrime: Discord.MessageHandler = {
  event: 'message',
  handler: async function (message: Discord.Message): Promise<void> {
    if (isMemeLord(message)) return

    const memeCrime = await findMemeCriminal(message)

    if (memeCrime != null) {
      const embed = new Discord.MessageEmbed()
        .setColor('#ff001e')
        .setTitle('A MEME CRIME HAS BEEN COMITTED')
        .setDescription(`<@${message.author.id}> HAS COMMITTED A GRAVE SIN`)
        .addField('THE AGGRIVED PARTY', `<@${memeCrime?.user}>`, true)
        .setImage(memeCrime.imageUrl)

      await message.channel.send(embed)
    }

    for (const [, attachment] of message.attachments) {
      const imageHash = await hashAttachment(attachment.attachment)
      await ShitPost.create({ author: message.author.id, messageContent: message.content, imageHash })
    }
  }
}

module.exports = memeCrime
