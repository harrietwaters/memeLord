import * as Discord from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TriggeredEventHandler, CommandHandler } from 'src/common/types';

export type DiscordMessage = Discord.Message;

@Injectable()
export class DiscordClient {
    private readonly client: Discord.Client;
    private readonly configService: ConfigService;

    constructor(configService: ConfigService) {
        this.client = new Discord.Client();
        this.client.setMaxListeners(100)
        this.configService = configService;
    }

    private async onModuleInit(){
        await this.login();
    }

    private login(): Promise<string> {
        return this.client.login(
            this.configService.get<string>('CLIENT_TOKEN')
        );
    }

    public addCommandEventListener(
        listener: any
    ): void {
        this.addListener('message', function(message: DiscordMessage) {
            if( message.client.users.cache.get(message.author.id)?.username === 'MemeLord') return
            if( message.cleanContent.toLowerCase().includes('http')) return
            listener(message)
        });
    }

    public addTriggerEventListener(
        listener: any
    ): void {
        this.addListener('message', function(message: DiscordMessage) {
            if( message.client.users.cache.get(message.author.id)?.username === 'MemeLord') return
            if( message.cleanContent.toLowerCase().includes('http')) return
            listener(message)
        });
    }

    private addListener(
        event: string,
        listener: (...args) => string | Promise<string> | void | Promise<void>
    ): void {
        this.client.addListener(event, listener);
    }
}
