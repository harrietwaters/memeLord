import { Test, TestingModule } from '@nestjs/testing';
import { StudyBladeService } from './study-blade.service';

describe('StudyBladeService', () => {
  let service: StudyBladeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyBladeService],
    }).compile();

    service = module.get<StudyBladeService>(StudyBladeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
