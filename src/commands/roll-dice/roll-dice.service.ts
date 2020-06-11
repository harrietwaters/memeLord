import { Injectable } from '@nestjs/common';
import { Command, ReplyWithReturn } from 'src/common/decorators';
import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { CommandService } from 'src/common/types';

function getRoller(die, faces) {
    return function*() {
        for (let i = 0; i < die; i++) {
            yield Math.floor(Math.random() * faces);
        }
    };
}

@Injectable()
export class RollDiceService implements CommandService {
    private readonly client: DiscordClient;
    constructor(client: DiscordClient) {
        this.client = client;
        this.client.addCommandEvent(this.response);
    }

    @Command('!rollDice', [
        { name: 'Number of die', type: 'number' },
        { name: 'Number of faces', type: 'string' }
    ])
    @ReplyWithReturn()
    public response([dieCount, dieFaces]: [number, number | string], message: DiscordMessage): string {
        let dieFacesInt: number;
        if (typeof dieFaces === 'string') {
            dieFacesInt = parseInt(dieFaces.slice(1));
        } else {
            dieFacesInt = dieFaces;
        }

        const roller = getRoller(dieCount, dieFacesInt);
        const results = Array.from(roller()).join(', ');
        return `<@${message.author.id}> here's your results: ${results}`;
    }
}
