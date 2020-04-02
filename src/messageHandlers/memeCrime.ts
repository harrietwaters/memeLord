import * as Discord from 'discord.js'
import { Op } from 'sequelize'

import { hashAttachment } from '../lib/hashAttatchment'
import { ShitPost } from '../models'
import { isMemeLord } from '../lib/util'

export interface MemeCrime {
  user: string
  imageUrl: string
}

export async function findMemeCriminal (message: Discord.Message): Promise<MemeCrime | null> {
  const hashMap = {}
  for (const [, attachment] of message.attachments) {
    hashMap[(await hashAttachment(attachment.attachment))] = attachment.attachment
  }

  const memeCrimeVictim = await ShitPost.findOne({
    where: {
      imageHash: {
        [Op.in]: Object.keys(hashMap)
      }
    }
  })

  if (memeCrimeVictim == null) return null

  return {
    user: memeCrimeVictim.get('author'),
    imageUrl: hashMap[memeCrimeVictim.get('imageHash')]
  }
}

const memeCrime: Discord.MessageHandler = {
  event: 'message',
  handler: async function (message: Discord.Message): Promise<void> {
    if (isMemeLord(message)) return

    const memeCrime = await findMemeCriminal(message)

    if (memeCrime != null) {
      const embed = new Discord.MessageEmbed()
        .setAuthor('Meme Police')
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
