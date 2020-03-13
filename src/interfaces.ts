import * as Discord from 'discord.js';

export interface CommandArgs {
    client: Discord.Client
}

export interface Command {
    name: string;
    description: string;
    trigger: (message: Discord.Message, args: CommandArgs) => Promise<Boolean> | Boolean;
    execute: (message: Discord.Message, args: CommandArgs) => Promise<void> | void;
}