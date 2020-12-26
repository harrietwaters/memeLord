import { Injectable } from '@nestjs/common';
import * as Canvas from 'canvas';
import * as Discord from 'discord.js';
import { Command, ReplyWithReturn } from 'src/common/decorators';
import { ComplexResponse } from 'src/common/types';

@Injectable()
export class DrakeService {
    private readonly maxTextWidth: number = 15;

    @Command('!drake', [
        { name: 'Top Panel', type: 'string' },
        { name: 'Bottom Panel', type: 'string' }
    ])
    @ReplyWithReturn()
    public async response(
        [topPanel, bottomPanel]: [string, string],
        message: Discord.Message
    ): Promise<ComplexResponse> {
        const canvas = Canvas.createCanvas(539, 539);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('images/drake.jpeg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = '32px impact';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        const topLines: string[] = this.splitText(topPanel);
        const bottomLines: string[] = this.splitText(bottomPanel);

        this.formatText(ctx, 395, 140, topLines);
        this.formatText(ctx, 395, 410, bottomLines);

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

    private formatText(ctx: Canvas.CanvasRenderingContext2D, x: number, y: number, lines: string[]) {
        const middlePos: number = Math.floor(lines.length / 2);
        const firstHalf: string[] = lines.slice(0, middlePos);
        const secondHalf: string[] = lines.slice(middlePos);
        for (let i = 0; i < firstHalf.length; i++) {
            ctx.fillText(firstHalf[i], x, y - 32 * (firstHalf.length - i), 265);
        }
        for (let i = 0; i < secondHalf.length; i++) {
            ctx.fillText(secondHalf[i], x, y + 32 * i, 265);
        }
    }
}
