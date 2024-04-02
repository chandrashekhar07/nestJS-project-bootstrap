import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CommonModule } from './common';
import type { IConfig } from './common/interfaces/config.interface';
import { CoreModule } from './core/core.module';
import { PassengerModule } from './passenger/passenger.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<IConfig, true>) => {
                const {
                    host,
                    password,
                    port,
                    username,
                    database,
                    shouldSynchronize,
                } = configService.get('database', {
                    infer: true,
                });

                return {
                    type: 'postgres',
                    host,
                    port,
                    username,
                    password,
                    database,
                    synchronize: shouldSynchronize,
                    autoLoadEntities: true,
                } as PostgresConnectionOptions;
            },
        }),
        PassengerModule,
        CommonModule,
        CoreModule,
    ],
    providers: [],
})
export class ApplicationModule {}
