import { Injectable, Inject } from '@nestjs/common';
import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { Command, ReplyWithReturn } from 'src/common/decorators';
import { getRepository, Repository } from 'typeorm';
import { MemeHouse } from 'src/models/meme-house.entity';
import { CommandService } from 'src/common/types';

@Injectable()
export class ListHousesService implements CommandService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @Command('!listHouses')
    @ReplyWithReturn()
    public async response(args: never, message: DiscordMessage): Promise<string> {
        const memeHouseRepository = getRepository(MemeHouse);

        const houses = await memeHouseRepository.find();
        let msg: string = '';
        for (const house of houses) {
            const houseName: string = `${house.name}\n`;
            const users = house.sortingHatUsers;
            let userList: string = '';

            for (const user of users) {
                // @ts-ignore
                const snowflake = await message.client.users.resolveID(user.authorId);

                if (snowflake == null) {
                    return 'you broke me :(';
                }

                const resolvedUser = await message.client.users.fetch(snowflake);

                userList = userList.concat(`\t* ${resolvedUser.username}\n`);
            }

            msg = msg.concat(houseName, userList);
        }

        return msg;
    }
}
