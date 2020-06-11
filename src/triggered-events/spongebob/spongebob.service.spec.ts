import { Test, TestingModule } from '@nestjs/testing';
import { SpongebobService } from './spongebob.service';

describe('SpongebobService', () => {
    let service: SpongebobService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SpongebobService]
        }).compile();

        service = module.get<SpongebobService>(SpongebobService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
