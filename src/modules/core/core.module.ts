import { Module } from '@nestjs/common';
import { HealthController } from './controllers';
import { LogInterceptor } from './interceptors';
import { MessageGeneratorInterceptor } from './interceptors/message-generator.interceptor';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../common';
import configFactory from './config/config';
import { environmentVariableValidator } from './config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TerminusModule,
        ConfigModule.forRoot({
            load: [configFactory],
            isGlobal: true,
            cache: true,
            validate: environmentVariableValidator,
        }),
    ],
    providers: [
        LogInterceptor,
        MessageGeneratorInterceptor,

        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },

        {
            provide: APP_INTERCEPTOR,
            useClass: MessageGeneratorInterceptor,
        },
    ],
    exports: [],
    controllers: [HealthController],
})
export class CoreModule {}
