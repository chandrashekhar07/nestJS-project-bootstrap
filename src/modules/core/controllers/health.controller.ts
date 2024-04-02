import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { HealthCheckService, type HealthCheckResult } from '@nestjs/terminus';

import {
    LogConfig,
    PublicRoute,
    ResponseMessage,
} from '../../common/decorators';

@LogConfig({
    logHeaders: false,
    logRequestBody: false,
    logResponseBody: false,
})
@PublicRoute()
@Controller()
export class HealthController {
    constructor(private readonly health: HealthCheckService) {}

    @LogConfig({
        logHeaders: false,
        logRequestBody: false,
        logResponseBody: false,
    })
    @Version(VERSION_NEUTRAL)
    @ResponseMessage('Welcome to backend app')
    @Get()
    async getVersion(): Promise<{
        version: string;
        health: HealthCheckResult;
    }> {
        const health = await this.health.check([]);

        return {
            version: process.env.npm_package_version ?? '0.0.0',
            health,
        };
    }
}
