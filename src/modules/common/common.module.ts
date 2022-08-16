import { Module } from '@nestjs/common';
import { LogInterceptor } from './interceptors';
import { LoggerService } from './providers';
import { WelcomeController } from './welcome.controller';

@Module({
    providers: [LoggerService, LogInterceptor],
    exports: [LoggerService, LogInterceptor],
    controllers: [WelcomeController]
})
export class CommonModule {}
