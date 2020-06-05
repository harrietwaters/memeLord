import { Module } from '@nestjs/common';
import { WordSmith } from './word-smith';

@Module({
  providers: [WordSmith],
  exports: [WordSmith]
})
export class UtilitiesModule {}
