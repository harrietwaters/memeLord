import { Test, TestingModule } from '@nestjs/testing';
import { SaveShitPostService } from './save-shit-post.service';

describe('SaveShitPostService', () => {
    let service: SaveShitPostService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SaveShitPostService]
        }).compile();

        service = module.get<SaveShitPostService>(SaveShitPostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
