import { Test, TestingModule } from '@nestjs/testing';
import { SmolDogService } from './smol-dog.service';

describe('SmolDogService', () => {
  let service: SmolDogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmolDogService],
    }).compile();

    service = module.get<SmolDogService>(SmolDogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
