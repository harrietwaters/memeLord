import { Test, TestingModule } from '@nestjs/testing';
import { TheGangService } from './the-gang.service';

describe('TheGangService', () => {
    let service: TheGangService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TheGangService]
        }).compile();

        service = module.get<TheGangService>(TheGangService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
