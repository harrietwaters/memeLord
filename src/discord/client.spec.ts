import { Test, TestingModule } from '@nestjs/testing';
import { DiscordClient } from './discord-client';

describe('Client', () => {
    let provider: DiscordClient;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DiscordClient]
        }).compile();

        provider = module.get<DiscordClient>(DiscordClient);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
