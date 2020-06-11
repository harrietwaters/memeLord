import * as Discord from 'discord.js';
import { DiscordMessage } from 'src/discord/discord-client';

// Triggered Events
export interface ComplexResponse {
    reply?: string | null | undefined;
    attachment?: Discord.BufferResolvable;
}

export type HandlerResponse =
    | void
    | Promise<void>
    | string
    | Promise<string>
    | ComplexResponse
    | Promise<ComplexResponse>;

export type CompletedHandlerResponse = Exclude<HandlerResponse, Promise<any>>;

export type TriggeredEventHandler = (cleanMessage: string, message?: DiscordMessage) => HandlerResponse;

export interface TriggeredEventService {
    response: TriggeredEventHandler;
}

// Commands
export interface CommandArg {
    name: string;
    type: 'string' | 'number';
}

export type CommandArgs = Array<CommandArg>;

export type CompletedCommandResponse = Exclude<HandlerResponse, Promise<any>>;

export type CommandHandler = (args: Array<number | string>, message?: DiscordMessage) => HandlerResponse;

export interface CommandService {
    response: CommandHandler;
}
