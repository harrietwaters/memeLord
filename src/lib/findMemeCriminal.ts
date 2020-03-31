import * as Discord from 'discord.js'
import { Op } from 'sequelize'

import { hashAttachment } from './hashAttatchment'
import { ShitPost } from '../models/shitPost'

export interface MemeCrime {
  user: string
  imageUrl: string
}

export async function findMemeCriminal (message: Discord.Message): Promise<MemeCrime | null> {
  const hashMap = {}
  for (const [, attachment] of message.attachments) {
    hashMap[(await hashAttachment(attachment.attachment))] = attachment.attachment
  }

  const memeCriminal = await ShitPost.findOne({
    where: {
      imageHash: {
        [Op.in]: Object.keys(hashMap)
      }
    }
  })

  if (memeCriminal == null) return null

  return {
    user: memeCriminal.get('user'),
    imageUrl: hashMap[memeCriminal.get('imageHash')]
  }
}
