import * as Joi from '@hapi/joi';
import * as _ from 'lodash';
import { IConfig } from '../interfaces/config.interface';
import { API_DEFAULT_PORT, API_DEFAULT_PREFIX } from '../models/constants';

export const configProvider = (): IConfig => {
    const env = process.env;

    const validationSchema = Joi.object().unknown().keys({
        API_PORT: Joi.string().required(),
        SWAGGER_ENABLE: Joi.string().required(),

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
        API_PORT: _.toNumber(env.API_PORT) || API_DEFAULT_PORT,
        API_PREFIX: env.API_PREFIX || API_DEFAULT_PREFIX,
        SWAGGER_ENABLE: env.SWAGGER_ENABLE === 'true',

        TYPEORM_CONNECTION: `${env.TYPEORM_CONNECTION}`,
        TYPEORM_HOST: `${env.TYPEORM_HOST}`,
        TYPEORM_PORT: _.toNumber(env.TYPEORM_PORT),
        TYPEORM_USERNAME: `${env.TYPEORM_USERNAME}`,
        TYPEORM_PASSWORD: `${env.TYPEORM_PASSWORD}`,
        TYPEORM_DATABASE: `${env.TYPEORM_DATABASE}`,
        TYPEORM_ENTITIES: `${env.TYPEORM_ENTITIES}`,
        TYPEORM_SYNCHRONIZE: env.TYPEORM_SYNCHRONIZE === 'true',
        TYPEORM_MIGRATIONS_AUTO_RUN: env.TYPEORM_MIGRATIONS_AUTO_RUN === 'true',

        CLOUDWATCH_GROUP_NAME: `${env.CLOUDWATCH_GROUP_NAME}`,
        CLOUDWATCH_LOG_STREAM_NAME: `${env.CLOUDWATCH_LOG_STREAM_NAME}`,
        AWS_ACCESS_KEY: `${env.AWS_ACCESS_KEY}`,
        AWS_SECRET_KEY: `${env.AWS_SECRET_KEY}`,
        AWS_REGION: `${env.AWS_REGION}`
    };
};
