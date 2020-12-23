import { DiscordContext } from '@harold-waters/discord-nestjs-transport';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { WordSmith } from '../utilities/word-smith';

@Injectable()
export class HasLocationWord implements CanActivate {
    @Inject('WordSmith')
    protected readonly wordSmith: WordSmith;

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rpcCtx = context.switchToRpc();
        const ctx: DiscordContext = rpcCtx.getContext();
        const cleanContent = ctx.getArgByIndex(0)?.cleanContent;
        const locations: string[] = await this.wordSmith.getLocations(cleanContent);

        console.dir({
            locations,
            cleanContent
        });
        return locations.length > 0;
    }
}
