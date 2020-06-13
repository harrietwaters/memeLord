import { Controller, Get } from '@nestjs/common';
import { HealthCheck, DNSHealthIndicator, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(private health: HealthCheckService, private dns: DNSHealthIndicator) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([() => this.dns.pingCheck('dilbert', 'https://dilbert.com')]);
    }
}
