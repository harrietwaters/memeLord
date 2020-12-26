import { Injectable } from '@nestjs/common';
import * as Discord from 'discord.js';
import { getRepository } from 'typeorm';
import { Command, ReplyWithReturn } from '../../common/decorators';
import { CommandService } from '../../common/types';
import { MemeHouse } from '../../models/meme-house.entity';

@Injectable()
export class ListHousesService implements CommandService {
    @Command('!listHouses')
    @ReplyWithReturn()
    public async response(args: never, message: Discord.Message): Promise<string> {
        const memeHouseRepository = getRepository(MemeHouse);

        const houses = await memeHouseRepository.find();
        let msg: string = '';
        for (const house of houses) {
            const houseName: string = `${house.name}\n`;
            const users = house.sortingHatUsers;
            let userList: string = '';

            for (const user of users) {
                // es-lint
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
