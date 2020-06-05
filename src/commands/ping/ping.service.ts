import { Injectable } from '@nestjs/common';
import { DiscordClient } from 'src/discord/discord-client';
import { Command, ReplyWithReturn } from 'src/common/decorators';

@Injectable()
export class PingService {
    private readonly client: DiscordClient;
    constructor(client: DiscordClient) {
        this.client = client;
        this.client.addTriggerEventListener(this.ping);
    }

    @Command('!ping')
    @ReplyWithReturn()
    public ping(): string {
        return 'PING!';
    }
}
