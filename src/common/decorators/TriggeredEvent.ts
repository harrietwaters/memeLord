import { DiscordMessage } from 'src/discord/discord-client';

type TesterFunction = (msg: string) => boolean | Promise<boolean>;
type TesterString = string
type TesterStrings = Array<string>

type Tester = TesterFunction | TesterString | TesterStrings

export function TriggeredEvent(test?: Tester) {
    return function decorator(
        target,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        if (typeof original === 'function') {
            descriptor.value = async function(...args) {
                const message: DiscordMessage = args[0];
                let passes = false;

                const lowerMsg = message.cleanContent.toLocaleLowerCase();

                switch (typeof test) {
                    case 'string':
                        passes = lowerMsg.includes(test.toLowerCase());
                        break;
                    case 'function':
                        passes = await test(message.cleanContent);
                        break;
                    case 'object':
                        if (Array.isArray(test)){
                            passes = test.some((str: string) => lowerMsg.includes(str.toLowerCase()));
                        }
                        break;
                    case 'undefined':
                        passes = true;
                        break;
                }

                if (passes) {
                    await original.apply(this, [message.cleanContent, ...args]);
                }
            };
        }
    };
}
