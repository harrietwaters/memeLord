import { Test, TestingModule } from '@nestjs/testing';
import { PeteRatService } from './pete-rat.service';

describe('PeteRatService', () => {
  let service: PeteRatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeteRatService],
    }).compile();

    service = module.get<PeteRatService>(PeteRatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
