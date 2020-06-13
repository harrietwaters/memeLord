import { zip } from 'lodash';
import { DiscordMessage } from '../../discord/discord-client';
import { CommandArgs } from '../types';

function printHelp(commandName: string, commandArgs: CommandArgs) {
    const argHelp = commandArgs.map(({ name, type }) => `${name} [${type}]`).join(' ');
    return `Usage: ${commandName} ${argHelp}}`;
}

export function Command(commandName: string, commandArgs?: CommandArgs) {
    return function decorator(target, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        if (typeof original === 'function') {
            descriptor.value = async function(...args) {
                const message: DiscordMessage = args[0];

                const userArgs = message.cleanContent.split(/\s+/);

                if (!userArgs.shift().startsWith(commandName)) return;

                try {
                    let parsedArgs: Array<number | string> = [];
                    if (commandArgs) {
                        parsedArgs = zip(userArgs, commandArgs).map(([userArg, commandArg]) => {
                            switch (commandArg.type) {
                                case 'string':
                                    return userArg;
                                case 'number':
                                    const parsedInt = parseInt(userArg);
                                    if (!Number.isNaN(parsedInt)) {
                                        return parseInt(userArg);
                                    }
                                default:
                                    throw new Error('Bad Arg');
                            }
                        });
                    }
                    return () => original.apply(this, [parsedArgs, ...args]);
                } catch (err) {
                    printHelp(commandName, commandArgs);
                }
            };
        }
    };
}
