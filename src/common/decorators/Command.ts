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

                if (!message.cleanContent.startsWith(commandName)) return;

                const argRegExp = RegExp(/['].*?[']|["].*?["]|[`].*?[`]|[^\s]+/, 'g');

                let results: string[];
                const userArgs: string[] = [];
                while ((results = argRegExp.exec(message.cleanContent)) != null) {
                    userArgs.push(results[0]);
                }
                userArgs.shift();

                try {
                    let parsedArgs: Array<number | string> = [];
                    if (commandArgs) {
                        parsedArgs = zip(userArgs, commandArgs).map(([userArg, commandArg]) => {
                            switch (commandArg.type) {
                                case 'string':
                                    const quotes = RegExp(/^['"`].*?['"`]$/);

                                    if (quotes.test(userArg)) {
                                        userArg = userArg.slice(1, userArg.length - 1);
                                    }
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
                    message.reply(printHelp(commandName, commandArgs));
                }
            };
        }
    };
}
