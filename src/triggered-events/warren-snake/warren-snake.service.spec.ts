import { Test, TestingModule } from '@nestjs/testing';
import { WarrenSnakeService } from './warren-snake.service';

describe('WarrenSnakeService', () => {
  let service: WarrenSnakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarrenSnakeService],
    }).compile();

    service = module.get<WarrenSnakeService>(WarrenSnakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
