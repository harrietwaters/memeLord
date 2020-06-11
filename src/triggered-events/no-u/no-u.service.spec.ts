import { Test, TestingModule } from '@nestjs/testing';
import { NoUService } from './no-u.service';

describe('NoUService', () => {
    let service: NoUService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NoUService]
        }).compile();

        service = module.get<NoUService>(NoUService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
