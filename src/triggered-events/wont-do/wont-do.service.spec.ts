import { Test, TestingModule } from '@nestjs/testing';
import { WontDoService } from './wont-do.service';

describe('WontDoService', () => {
    let service: WontDoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WontDoService]
        }).compile();

        service = module.get<WontDoService>(WontDoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
