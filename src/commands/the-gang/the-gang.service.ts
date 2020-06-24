import * as Canvas from 'canvas';
import { Injectable } from '@nestjs/common';
import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { Command, ReplyWithReturn } from 'src/common/decorators';
import { ComplexResponse } from 'src/common/types';
import { Logger } from 'nestjs-pino';

@Injectable()
export class TheGangService {
    private readonly client: DiscordClient;
    private readonly logger: Logger;

    private readonly maxTextWidth: number = 22;
    constructor(client: DiscordClient, logger: Logger) {
        this.client = client;
        this.client.addCommandEvent(this.response.bind(this));
        this.logger = logger;
    }

    @Command('!theGang', [{ name: 'text', type: 'string' }])
    @ReplyWithReturn()
    public async response([text]: [string], message: DiscordMessage): Promise<ComplexResponse> {
        const theGang: string = 'the gang ';
        if (text.toLowerCase().startsWith(theGang)) {
            text = text.slice(theGang.length);
        }

        text = text
            .split(/\s+/)
            .map(word => (word ? word[0].toUpperCase().concat(word.slice(1)) : ''))
            .join(' ');

        const canvas = Canvas.createCanvas(1100, 700);
        const ctx = canvas.getContext('2d');

        const textSize = 74;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 1100, 700);

        ctx.font = `${textSize}px Textile Regular`;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';

        const splitText: string[] = this.splitText(`"The Gang ${text}"`);
        this.formatText(ctx, 550, 375, splitText, textSize);

        return {
            reply: `<@${message.author.id}>`,
            attachment: canvas.toBuffer()
        };
    }

    private splitText(text: string): string[] {
        const textArr: string[] = text.split(/\s+/);
        let lineNo: number = 0;
        let word: string;
        const lines: string[] = [''];

        while ((word = textArr.shift()) != null) {
            if (word.length + lines[lineNo].length > this.maxTextWidth) {
                lineNo += 1;
                lines[lineNo] = '';
            }
            lines[lineNo] += word + ' ';
        }

        return lines;
    }

    private formatText(ctx: Canvas.CanvasRenderingContext2D, x: number, y: number, lines: string[], textSize: number) {
        const middlePos: number = Math.floor(lines.length / 2);
        const firstHalf: string[] = lines.slice(0, middlePos);
        const secondHalf: string[] = lines.slice(middlePos);
        for (let i = 0; i < firstHalf.length; i++) {
            ctx.fillText(firstHalf[i], x, y - textSize * 1.25 * (firstHalf.length - i));
        }
        for (let i = 0; i < secondHalf.length; i++) {
            ctx.fillText(secondHalf[i], x, y + textSize * 1.25 * i);
        }
    }
}
