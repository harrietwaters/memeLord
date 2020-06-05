import { Test, TestingModule } from '@nestjs/testing';
import { WordSmith } from './word-smith';

describe('WordSmith', () => {
  let provider: WordSmith;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordSmith],
    }).compile();

    provider = module.get<WordSmith>(WordSmith);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
