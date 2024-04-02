/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { toNumber } from 'lodash';
import type { IConfig } from '../../common/interfaces/config.interface';

const { env } = process;

const configFactory = (): IConfig => ({
    apiPort: toNumber(env.API_PORT),
    swagger: {
        enabled: env.SWAGGER_ENABLE?.toLocaleLowerCase() === 'true',
    },

    database: {
        host: env.DATABASE_HOST!,
        port: toNumber(env.DATABASE_PORT),
        username: env.DATABASE_USERNAME!,
        password: env.DATABASE_PASSWORD!,
        database: env.DATABASE_NAME!,
        shouldSynchronize:
            env.DATABASE_SYNCHRONIZE?.toLocaleLowerCase() === 'true',
        migrationsAutoRun:
            env.DATABASE_MIGRATIONS_AUTO_RUN?.toLocaleLowerCase() === 'true',
    },

    aws: {
        cloudwatchGroupName: env.CLOUDWATCH_GROUP_NAME!,
        cloudwatchLogStreamName: env.CLOUDWATCH_LOG_STREAM_NAME!,
        region: env.AWS_REGION!,
    },
});

export default configFactory;
