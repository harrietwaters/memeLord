import { Test, TestingModule } from '@nestjs/testing';
import { DontAtMeService } from './dont-at-me.service';

describe('DontAtMeService', () => {
  let service: DontAtMeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DontAtMeService],
    }).compile();

    service = module.get<DontAtMeService>(DontAtMeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
