import { DiscordMessage } from '../../discord/discord-client';

export function IgnoreMemeLord() {
    return function decorator(target, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        if (typeof original === 'function') {
            descriptor.value = async function(...args) {
                const message: DiscordMessage = args[0];
                if (message.client.users.cache.get(message.author.id)?.username !== 'MemeLord') {
                    descriptor.value = original;
                    await original.apply(this, args);
                }
                return;
            };
        }
    };
}
