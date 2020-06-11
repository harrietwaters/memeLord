import { Module } from '@nestjs/common';
import { WordSmith } from './word-smith';
import { Hasher } from './hasher';

@Module({
    providers: [WordSmith, Hasher],
    exports: [WordSmith, Hasher]
})
export class UtilitiesModule {}
