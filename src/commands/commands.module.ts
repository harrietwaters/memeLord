import { Module } from '@nestjs/common';
import { PingService } from './ping/ping.service';
import { DiscordModule } from 'src/discord/discord.module';
import { RollDiceService } from './roll-dice/roll-dice.service';

@Module({
    imports: [DiscordModule],
    providers: [PingService, RollDiceService],
})
export class CommandsModule {}
