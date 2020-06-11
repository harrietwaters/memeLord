import { Test, TestingModule } from '@nestjs/testing';
import { GundamLikeService } from './gundam-like.service';

describe('GundamLikeService', () => {
    let service: GundamLikeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GundamLikeService]
        }).compile();

        service = module.get<GundamLikeService>(GundamLikeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
