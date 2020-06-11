import { Module } from '@nestjs/common';
import { PingService } from './ping/ping.service';
import { DiscordModule } from 'src/discord/discord.module';
import { RollDiceService } from './roll-dice/roll-dice.service';
import { PutOnHatService } from './put-on-hat/put-on-hat.service';
import { ListHousesService } from './list-houses/list-houses.service';

@Module({
    imports: [DiscordModule],
    providers: [PingService, RollDiceService, PutOnHatService, ListHousesService]
})
export class CommandsModule {}
