import { ContainsText, DiscordContext, DiscordEvent } from '@harold-waters/discord-nestjs-transport';
import { Controller, UseGuards } from '@nestjs/common';
import { Ctx } from '@nestjs/microservices';

@Controller()
export class AutoReactController {
    @DiscordEvent('message')
    @UseGuards(ContainsText('pete'))
    public async peteRat(@Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        await message.react('🐀');
        await message.react('🍞');
        await message.react('📈');
    }

    @DiscordEvent('message')
    @UseGuards(ContainsText('trump'))
    public async trump(@Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        await message.react('🇺🇸');
    }

    @DiscordEvent('message')
    @UseGuards(ContainsText('warren'))
    public async warrenSnake(@Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        await message.react('🐍');
    }

    @DiscordEvent('message')
    @UseGuards(ContainsText(/(wont do|won't do|will not do)/))
    public async wontDo(@Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        const wontDoEmoji = message.guild.emojis.cache.find(e => e.name === 'wontdo');
        await message.react(wontDoEmoji);
    }

    @DiscordEvent('message')
    @UseGuards(ContainsText('gundam'))
    public async gundam(@Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        const gundamEmoji = message.guild.emojis.cache.find(e => e.name === 'gundam');
        await message.react(gundamEmoji);
    }

    @DiscordEvent('message')
    @UseGuards(ContainsText('fauci|vaccine'))
    public async warrenSnake(@Ctx() ctx: DiscordContext) {
        const message = ctx.getArgByIndex(0);
        await message.react('💉');
    }
}
