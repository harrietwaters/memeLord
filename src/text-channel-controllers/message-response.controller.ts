import { ContainsText, DiscordContext, DiscordEvent, Generic, Odds } from '@harold-waters/discord-nestjs-transport';
import { Body, Controller, UseGuards } from '@nestjs/common';
import { Ctx } from '@nestjs/microservices';
import * as Canvas from 'canvas';
import * as fs from 'fs';
import * as _ from 'lodash';
import { HasLocationWord } from '../guards/has-location-word.guard';
import { NounCount } from '../guards/noun-count.guard';
import { WordSmith } from '../utilities/word-smith';

@Controller()
export class MessageResponseController {
    private readonly wordSmith: WordSmith;

    constructor(wordSmith: WordSmith) {
        this.wordSmith = wordSmith;
    }

    @DiscordEvent('message')
    @UseGuards(Odds(1, 50), NounCount(1))
    public async buttBott(@Body() content: string) {
        const nouns = await this.wordSmith.getNouns(content);
        return content.replace(_.sample(nouns), 'butt');
    }

    @DiscordEvent('message')
    @UseGuards(Odds(1, 2), ContainsText(/^(dont at me|don\'t at me|don\'t \@ me|dont \@ me)/))
    public async dontAtMe() {
        return 'ur a little bitch';
    }

    @DiscordEvent('message')
    @UseGuards(ContainsText('edf'))
    public async edf() {
        return 'EDF! EDF!! EDF!!!';
    }

    @DiscordEvent('message')
    @UseGuards(Odds(1, 5), ContainsText(/^you/))
    public async noU() {
        return 'no u';
    }

    @DiscordEvent('message')
    @UseGuards(ContainsText('smol'))
    public async smolDog(@Body() content) {
        const words = content.split(/\s+/);
        const smolThing = words.indexOf('smol') + 1;

        if (!smolThing) return;

        return `SMOL ${words[smolThing].toUpperCase()}`;
    }

    @DiscordEvent('message')
    @UseGuards(Odds(1, 50), NounCount(3))
    public async studyBlade(@Body() content: string, @Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        const nouns = _.shuffle(await this.wordSmith.getNouns(content));
        if (nouns.length < 3) return;
        const canvas = Canvas.createCanvas(680, 510);
        const canvasCtx = canvas.getContext('2d');

        const background = await Canvas.loadImage('images/shrekBlade.jpg');
        canvasCtx.drawImage(background, 0, 0, canvas.width, canvas.height);

        canvasCtx.font = '20px book-antiqua';
        canvasCtx.fillStyle = '#000000';

        canvasCtx.fillText('When you were partying I\nstudied the', 10, 20);
        canvasCtx.fillText('When you were having premarital\nsex I mastered the', 10, 85);
        canvasCtx.fillText('While you wasted your days\nat the gym in pursuit of vanity I\ncultivated', 10, 145);
        canvasCtx.fillText(
            'And now that the world is\non fire and the barbarians\nare at the gate you have the\naudacity to come to me\nfor help?',
            10,
            230
        );

        canvasCtx.font = '24px sans-serif';
        canvasCtx.fillStyle = '#9c0000';

        canvasCtx.fillText(` ${nouns[0]}`, 125, 45);
        canvasCtx.fillText(`${nouns[1]}`, 200, 110);
        canvasCtx.fillText(`${nouns[2]}`, 120, 194);

        message.reply({
            files: [
                {
                    attachment: canvas.toBuffer(),
                    name: 'studyBlade.jpeg'
                }
            ]
        });
    }

    @DiscordEvent('message')
    @UseGuards(
        Odds(1, 50),
        Generic(content => content && !content.startsWith('http') && content.length > 1 && content.length < 32)
    )
    public async spongebob(@Body() content: string, @Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        const text: string[] = [];
        for (let i = 0; i + 1 <= content.length; i += 2) {
            text.push(content[i].toLowerCase());

            if (content[i + 1] == null) continue;

            text.push(content[i + 1].toUpperCase());
        }

        const canvas = Canvas.createCanvas(680, 510);
        const canvasCtx = canvas.getContext('2d');

        const background = await Canvas.loadImage('images/sPoNgEbOb.jpeg');
        canvasCtx.drawImage(background, 0, 0, canvas.width, canvas.height);

        canvasCtx.font = '72px impact';
        canvasCtx.fillStyle = '#ffffff';
        canvasCtx.strokeStyle = '#000000';

        // Actually fill the text with a solid color
        const x = 340;
        const y = 475;
        const maxWidth = 650;
        canvasCtx.textAlign = 'center';

        canvasCtx.fillText(text.join(''), x, y, maxWidth);
        canvasCtx.strokeText(text.join(''), x, y, maxWidth);

        message.reply({
            files: [
                {
                    attachment: canvas.toBuffer(),
                    name: 'spongebob.jpeg'
                }
            ]
        });
    }

    @DiscordEvent('message')
    @UseGuards(Odds(1, 50), HasLocationWord)
    public async whatIfWeKissed(@Body() content: string) {
        const locations: string[] = await this.wordSmith.getLocations(content);
        const kissingLocation: string = _.sample(locations);
        const preposition = this.wordSmith.getPreposition();
        const article = _.random(1, false) > 0 ? ' the ' : ' ';
        return `😳 What if we kissed ${preposition}${article}${kissingLocation} 🙈`;
    }

    @DiscordEvent('message')
    @UseGuards(
        Generic(msg => {
            const coolCount = msg.cleanContent
                .toLowerCase()
                .split(/\s+/)
                .filter(word => word.includes('cool') || word.includes('🆒'));

            return coolCount.length > 2;
        })
    )
    public coolAbed(@Ctx() ctx: DiscordContext) {
        const coolAbedGif = fs.readFileSync('images/coolAbed.gif');
        const message = ctx.getArgByIndex(0);
        return message.reply({
            files: [
                {
                    attachment: coolAbedGif,
                    name: 'cool.gif'
                }
            ]
        });
    }
}
