import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common';
import { PassengerModule } from './passenger/passenger.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception.filter';
import { configProvider } from './common/providers';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            database: configProvider().TYPEORM_DATABASE,
            host: configProvider().TYPEORM_HOST,
            port: configProvider().TYPEORM_PORT,
            username: configProvider().TYPEORM_USERNAME,
            password: configProvider().TYPEORM_PASSWORD,
            synchronize: configProvider().TYPEORM_SYNCHRONIZE,
            autoLoadEntities: true,
            migrationsRun: configProvider().TYPEORM_MIGRATIONS_AUTO_RUN
        }),
        PassengerModule,
        CommonModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class ApplicationModule {}
