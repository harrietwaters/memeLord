import { Injectable } from '@nestjs/common';
import { DiscordClient } from '../../discord/discord-client';
import { Command, ReplyWithReturn } from '../../common/decorators';

@Injectable()
export class PingService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.ping);
    }

    @Command('!ping')
    @ReplyWithReturn()
    public ping(): string {
        return 'PING!';
    }
}
