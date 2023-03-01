export interface IConfig {
    readonly apiPort: number;

    readonly swagger: {
        enabled: boolean;
    };

    readonly database: {
        readonly host: string;
        readonly port: number;
        readonly username: string;
        readonly password: string;
        readonly database: string;
        readonly entities: string;
        readonly synchronize: boolean;
        readonly migrationsAutoRun: boolean;
    };

    aws: {
        cloudwatchGroupName: string;
        cloudwatchLogStreamName: string;
        accessKey: string;
        secretKey: string;
        region: string;
    };
}
