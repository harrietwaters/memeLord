import * as Discord from "discord.js";

const smolDog = {
    name: 'smolDog',
    description: 'SMOL DOG!',
    trigger: (message: Discord.Message): Boolean => {
        const lowerMsg = message.content.toLowerCase()
        return lowerMsg.includes('small') && lowerMsg.includes('dog')
    },
    execute: (message: Discord.Message, args) => {
        message.channel.send('SMOL DOG');
    }
}

module.exports = smolDog;