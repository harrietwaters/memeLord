import { Test, TestingModule } from '@nestjs/testing';
import { DrakeService } from './drake.service';

describe('DrakeService', () => {
    let service: DrakeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DrakeService]
        }).compile();

        service = module.get<DrakeService>(DrakeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
