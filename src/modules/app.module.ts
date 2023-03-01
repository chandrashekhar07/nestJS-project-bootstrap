import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common';
import { PassengerModule } from './passenger/passenger.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception.filter';
import { config } from './common/providers/config.provider';
import { IConfig } from './common/interfaces/config.interface';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
            cache: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<IConfig, true>) => {
                const { host, password, port, username, database, synchronize } =
                    configService.get('database', {
                        infer: true
                    });

                return {
                    type: 'postgres',
                    host,
                    port,
                    username,
                    password,
                    database,
                    synchronize,
                    autoLoadEntities: true
                } as PostgresConnectionOptions;
            }
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
