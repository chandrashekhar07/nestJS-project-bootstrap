import * as Joi from '@hapi/joi';
import * as _ from 'lodash';
import { API_DEFAULT_PORT } from '../models/constants';
import { IConfig } from '../interfaces/config.interface';

export const config = (): IConfig => {
    const env = process.env;

    const validationSchema = Joi.object().unknown().keys({
        API_PORT: Joi.string().required(),
        SWAGGER_ENABLE: Joi.string().optional(),

        TYPEORM_HOST: Joi.string().required(),
        TYPEORM_PORT: Joi.string().required(),
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),
        TYPEORM_SYNCHRONIZE: Joi.string().required(),
        TYPEORM_MIGRATIONS_AUTO_RUN: Joi.string().required(),

        CLOUDWATCH_GROUP_NAME: Joi.string().required(),
        CLOUDWATCH_LOG_STREAM_NAME: Joi.string().required(),
        AWS_ACCESS_KEY: Joi.string().required(),
        AWS_SECRET_KEY: Joi.string().required(),
        AWS_REGION: Joi.string().required()
    });

    const result = validationSchema.validate(env);

    if (result.error) {
        throw new Error(`Configuration not valid: ${result.error.message}`);
    }

    return {
        apiPort: _.toNumber(env.API_PORT) || API_DEFAULT_PORT,
        swagger: {
            enabled: env.SWAGGER_ENABLE === 'true'
        },

        database: {
            host: env.TYPEORM_HOST!,
            port: _.toNumber(env.TYPEORM_PORT),
            username: env.TYPEORM_USERNAME!,
            password: env.TYPEORM_PASSWORD!,
            database: env.TYPEORM_DATABASE!,
            entities: env.TYPEORM_ENTITIES!,
            synchronize: env.TYPEORM_SYNCHRONIZE === 'true',
            migrationsAutoRun: env.TYPEORM_MIGRATIONS_AUTO_RUN === 'true'
        },

        aws: {
            cloudwatchGroupName: env.CLOUDWATCH_GROUP_NAME!,
            cloudwatchLogStreamName: env.CLOUDWATCH_LOG_STREAM_NAME!,
            accessKey: env.AWS_ACCESS_KEY!,
            secretKey: env.AWS_SECRET_KEY!,
            region: env.AWS_REGION!
        }
    };
};
