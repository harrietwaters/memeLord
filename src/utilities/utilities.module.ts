import { Global, Module } from '@nestjs/common';
import { WordSmith } from './word-smith';
import { Hasher } from './hasher';

@Global()
@Module({
    providers: [WordSmith, Hasher],
    exports: [WordSmith, Hasher]
})
export class UtilitiesModule {}
