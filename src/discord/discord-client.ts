import * as Discord from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

export type DiscordMessage = Discord.Message;

// TODO: Better name and types
async function* getExec(message: DiscordMessage, commands: Array<any>) {
    for (const command of commands) {
        yield command(message);
    }
}

@Injectable()
export class DiscordClient implements OnModuleInit {
    private readonly client: Discord.Client;
    private readonly configService: ConfigService;
    // TODO Type these
    private readonly commands: Array<any> = [];
    private readonly triggeredEvents: Array<any> = [];

    constructor(configService: ConfigService) {
        this.client = new Discord.Client();
        this.client.on('message', this.handleMessages.bind(this));
        this.configService = configService;
    }

    public async onModuleInit() {
        await this.login();
    }

    private login(): Promise<string> {
        return this.client.login(this.configService.get<string>('CLIENT_TOKEN'));
    }

    public addCommandEvent(listener: any): void {
        this.commands.push(listener);
    }

    public addTriggerEvent(listener: any): void {
        this.triggeredEvents.push(listener);
    }

    public addListener<K extends keyof Discord.ClientEvents>(
        event: K,
        listener: (...args: Discord.ClientEvents[K]) => any
    ): void {
        this.client.on(event, listener);
    }

    private async handleMessages(message: Discord.Message): Promise<void> {
        console.log(`Received message: ${message.cleanContent}`)
        for await (const exec of getExec(message, this.commands)) {
            if (exec) return exec(message);
        }
        for await (const exec of getExec(message, this.triggeredEvents)) {
            if (exec) return exec(message);
        }
    }
}
