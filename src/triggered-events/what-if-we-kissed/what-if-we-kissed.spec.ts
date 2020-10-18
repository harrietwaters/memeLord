import { Test, TestingModule } from '@nestjs/testing';
import { WhatIfWeKissed } from './what-if-we-kissed.service';

describe('ButtBotService', () => {
    let service: WhatIfWeKissed;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WhatIfWeKissed]
        }).compile();

        service = module.get<WhatIfWeKissed>(WhatIfWeKissed);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
