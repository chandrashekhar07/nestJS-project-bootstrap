import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class EnvironmentVariable {
    @IsNumber()
    API_PORT: number;

    @IsBoolean()
    @IsOptional()
    SWAGGER_ENABLED: boolean;

    @IsString()
    DATABASE_HOST: string;

    @IsNumber()
    DATABASE_PORT: number;

    @IsString()
    DATABASE_USERNAME: string;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;

    @IsBoolean()
    DATABASE_SYNCHRONIZE: boolean;

    @IsBoolean()
    DATABASE_MIGRATIONS_AUTO_RUN: boolean;
}
