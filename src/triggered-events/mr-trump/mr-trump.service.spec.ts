import { Test, TestingModule } from '@nestjs/testing';
import { MrTrumpService } from './mr-trump.service';

describe('MrTrumpService', () => {
    let service: MrTrumpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MrTrumpService]
        }).compile();

        service = module.get<MrTrumpService>(MrTrumpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
