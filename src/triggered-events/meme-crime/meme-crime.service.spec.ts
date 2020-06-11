import { Test, TestingModule } from '@nestjs/testing';
import { MemeCrimeService } from './meme-crime.service';

describe('MemeCrimeService', () => {
    let service: MemeCrimeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MemeCrimeService]
        }).compile();

        service = module.get<MemeCrimeService>(MemeCrimeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
