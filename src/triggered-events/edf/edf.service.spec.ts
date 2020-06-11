import { Test, TestingModule } from '@nestjs/testing';
import { EdfService } from './edf.service';

describe('EdfService', () => {
    let service: EdfService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EdfService]
        }).compile();

        service = module.get<EdfService>(EdfService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
