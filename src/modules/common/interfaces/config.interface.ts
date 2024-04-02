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
        readonly shouldSynchronize: boolean;
        readonly migrationsAutoRun: boolean;
    };

    aws: {
        cloudwatchGroupName: string;
        cloudwatchLogStreamName: string;
        region: string;
    };
}
