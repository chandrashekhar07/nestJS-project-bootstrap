export interface IConfig {
    readonly API_PORT: number;

    readonly API_PREFIX: string;

    readonly SWAGGER_ENABLE: boolean;

    readonly TYPEORM_CONNECTION: string;

    readonly TYPEORM_HOST: string;

    readonly TYPEORM_PORT: number;

    readonly TYPEORM_USERNAME: string;

    readonly TYPEORM_PASSWORD: string;

    readonly TYPEORM_DATABASE: string;

    readonly TYPEORM_ENTITIES: string;

    readonly TYPEORM_SYNCHRONIZE: boolean;

    readonly TYPEORM_MIGRATIONS_AUTO_RUN: boolean;

    readonly CLOUDWATCH_GROUP_NAME: string;
    readonly CLOUDWATCH_LOG_STREAM_NAME: string;
    readonly AWS_ACCESS_KEY: string;
    readonly AWS_SECRET_KEY: string;
    readonly AWS_REGION: string;
}
