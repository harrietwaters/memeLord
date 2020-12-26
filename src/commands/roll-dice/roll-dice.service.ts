import { Injectable } from '@nestjs/common';
import * as Discord from 'discord.js';
import { Command, ReplyWithReturn } from '../../common/decorators';
import { CommandService } from '../../common/types';

function getRoller(die, faces) {
    return function*() {
        for (let i = 0; i < die; i++) {
            yield Math.floor(Math.random() * faces);
        }
    };
}

@Injectable()
export class RollDiceService implements CommandService {
    @Command('!rollDice', [
        { name: 'Number of die', type: 'number' },
        { name: 'Number of faces', type: 'string' }
    ])
    @ReplyWithReturn()
    public response([dieCount, dieFaces]: [number, number | string], message: Discord.Message): string {
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
