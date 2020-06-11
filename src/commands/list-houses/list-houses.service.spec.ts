import { Test, TestingModule } from '@nestjs/testing';
import { ListHousesService } from './list-houses.service';

describe('ListHousesService', () => {
    let service: ListHousesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ListHousesService]
        }).compile();

        service = module.get<ListHousesService>(ListHousesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
