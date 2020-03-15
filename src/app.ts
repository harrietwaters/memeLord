import * as fs from 'fs'
import * as Discord from 'discord.js'

import { Command } from './interfaces'
import { ShitPosts } from './models/shitPosts'
import { sequelize } from './lib/db'
import { hashAttachment } from './lib/hashAttatchment'
import { findMemeCriminal } from './lib/findMemeCriminal'

const client = new Discord.Client()
const commands = new Discord.Collection<string, Command>()

client.on('ready', async (): Promise<void> => {
  const commandFiles: string[] = fs.readdirSync(`${__dirname}/commands/`).filter(file => file.endsWith('.ts') || file.endsWith('.js'))

  for (const file of commandFiles) {
    const commandFile: Command = await import(`${__dirname}/commands/${file}`)
    commands.set(commandFile.name, commandFile)
  }

  await sequelize.sync()
  console.log('I am ready for memes!')
})

// Find MEME CRIMES and save shit posts
client.on('message', async (message: Discord.Message) => {
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
    await ShitPosts.create({ user: message.author.id, messageContent: message.content, imageHash })
  }
})

// Command handler
client.on('message', async (message: Discord.Message) => {
  if (isMemeLord(message)) return
  for (const command of commands.values()) {
    const shouldTrigger: boolean = await command.trigger(message, { client })
    if (shouldTrigger) {
      console.log(`acting on command '${command.name}' for message \`${message.content}\``)
      await command.execute(message, { client })
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
client.login(process.env.CLIENT_TOKEN)

function isMemeLord (message: Discord.Message): boolean {
  return client.users.cache.get(message.author.id)?.username === 'MemeLord'
}
