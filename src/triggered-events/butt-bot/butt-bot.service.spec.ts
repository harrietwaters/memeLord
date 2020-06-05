import { Test, TestingModule } from '@nestjs/testing';
import { ButtBotService } from './butt-bot.service';

describe('ButtBotService', () => {
    let service: ButtBotService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ButtBotService],
        }).compile();

        service = module.get<ButtBotService>(ButtBotService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
