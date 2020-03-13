import * as Discord from 'discord.js';
import * as commandFiles from './commands'

import { Command } from './interfaces';

// Create an instance of a Discord client
const client = new Discord.Client();
const commands = new Discord.Collection<string, Command>();

commands.set(commandFiles.buttBot.name, commandFiles.buttBot);
commands.set(commandFiles.dontAtMe.name, commandFiles.dontAtMe);
commands.set(commandFiles.gundamLike.name, commandFiles.gundamLike);
commands.set(commandFiles.mrTrump.name, commandFiles.mrTrump);
commands.set(commandFiles.ping.name, commandFiles.ping);
commands.set(commandFiles.smolDog.name, commandFiles.smolDog);
commands.set(commandFiles.studyBlade.name, commandFiles.studyBlade);

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', async (message: Discord.Message) => {
  for(const command of commands.values()){
    if((await command.trigger(message, { client }))){
      console.log(`acting on command ${command.name} for message \`${message.content}\``)
      await command.execute(message, { client })
    }
  }
});

client.login(process.env.CLIENT_TOKEN);