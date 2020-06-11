export function Odds(numerator: number, demoninator: number = 100) {
    return function decorator(target, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        if (typeof original === 'function') {
            descriptor.value = async function(...args) {
                const passes = Math.ceil(Math.random() * demoninator) <= numerator;

                if (passes) {
                    await original.apply(this, args);
                }
            };
        }
    };
}
