import { DiscordContext, setClassName } from '@harold-waters/discord-nestjs-transport';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { WordSmith } from '../utilities/word-smith';

@Injectable()
abstract class NounCountGuard implements CanActivate {
    @Inject('WordSmith')
    protected readonly wordSmith: WordSmith;
    protected abstract count: number;

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rpcCtx = context.switchToRpc();
        const ctx: DiscordContext<'message'> = rpcCtx.getContext();
        const cleanContent = ctx.getArgByIndex(0)?.cleanContent;

        const nouns: string[] = await this.wordSmith.getNouns(cleanContent);
        return nouns.length >= this.count;
    }
}

export function NounCount(count: number): typeof NounCountGuard {
    class CustomNounCount extends NounCountGuard {
        protected count: number = count;
    }

    return setClassName(CustomNounCount, count.toString());
}
