import { Test, TestingModule } from '@nestjs/testing';
import { MemeScoreService } from './meme-score.service';

describe('MemeScoreService', () => {
    let service: MemeScoreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MemeScoreService]
        }).compile();

        service = module.get<MemeScoreService>(MemeScoreService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
