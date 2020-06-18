import { Controller, Get } from '@nestjs/common';
import { HealthCheck, DNSHealthIndicator, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private dns: DNSHealthIndicator,
        private typeORM: TypeOrmHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.dns.pingCheck('dilbert', 'https://dilbert.com'),
            () => this.typeORM.pingCheck('memeDb')
        ]);
    }
}
