import * as Discord from "discord.js";
import { Command } from "../interfaces";

export const dontAtMe: Command = {
    name: 'dontAtMe',
    description: 'Calls out those who do not wish to be atted',
    trigger: (message: Discord.Message): Boolean => {
        const lowerMsg = message.content.toLowerCase()
        const triggerWords =[`don't at me`, `don't @ me`, 'dont at me', 'dont @ me'];

        for(const word of triggerWords){
            if(lowerMsg.includes(word)) return true;
        }

        return false;
    },
    execute: (message: Discord.Message, args): void => {
        message.channel.send(`<@${message.author.id}> ur a little bitch`)
    }
}