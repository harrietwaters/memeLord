import { Module } from '@nestjs/common';
import { DiscordClient } from './discord-client';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [DiscordClient],
    exports: [DiscordClient]
})
export class DiscordModule {}
