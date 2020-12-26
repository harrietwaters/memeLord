import { Injectable } from '@nestjs/common';
import { Command, ReplyWithReturn } from '../../common/decorators';

@Injectable()
export class PingService {
    @Command('!ping')
    @ReplyWithReturn()
    public ping(): string {
        return 'PING!';
    }
}
