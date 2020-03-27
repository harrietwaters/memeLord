import * as Discord from 'discord.js'

declare module 'discord.js' {
  export interface CommandArgs {
    client: Discord.Client
  }

  export interface Command {
    name: string
    description: string
    trigger: (message: Discord.Message, args: CommandArgs) => Promise<boolean> | boolean
    execute: (message: Discord.Message, args: CommandArgs) => Promise<Discord.Message> | Promise<void> | Discord.Message | void
  }

  export interface MessageHandler {
    event: string
    handler: (message: Discord.Message) => Promise<void> | void
  }

  export interface Client {
    commands: Command[]
  }
}
