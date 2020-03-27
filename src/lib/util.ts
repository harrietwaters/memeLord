import * as Discord from 'discord.js'

export function odds (numerator: number, demoninator: number): boolean {
  return Math.floor(Math.random() * demoninator) > (numerator - 1)
}

export function isMemeLord (message: Discord.Message): boolean {
  return message.client.users.cache.get(message.author.id)?.username === 'MemeLord'
}
