import * as Discord from 'discord.js'

declare module 'discord.js' {
  export interface Loadable {
    name: string
    trigger: (message: Discord.Message) => Promise<boolean> | boolean
    execute: (message: Discord.Message) => Promise<Discord.Message> | Promise<void> | Discord.Message | void
  }

  export interface Command extends Loadable {
    description: string
    example: string
  }

  export type RandomEvent = Loadable

  export interface MessageHandler {
    event: string
    handler: (message: Discord.Message) => Promise<void> | void
  }

  export interface ReactHandler {
    event: string
    handler: (message: Discord.MessageReaction) => Promise<void> | void
  }

  export interface Client {
    commands: Command[]
    randomEvents: RandomEvent[]
  }
}
