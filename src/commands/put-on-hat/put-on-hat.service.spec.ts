import { Test, TestingModule } from '@nestjs/testing';
import { PutOnHatService } from './put-on-hat.service';

describe('PutOnHatService', () => {
    let service: PutOnHatService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PutOnHatService]
        }).compile();

        service = module.get<PutOnHatService>(PutOnHatService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
