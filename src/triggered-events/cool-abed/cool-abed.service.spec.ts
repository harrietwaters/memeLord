import { Test, TestingModule } from '@nestjs/testing';
import { CoolAbedService } from './cool-abed.service';

describe('CoolAbedService', () => {
  let service: CoolAbedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoolAbedService],
    }).compile();

    service = module.get<CoolAbedService>(CoolAbedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
