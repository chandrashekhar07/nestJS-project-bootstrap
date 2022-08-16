import * as winston from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { isDeploymentEnv } from '../utilities';
import { configProvider } from './config.provider';

export class LoggerService {
    private readonly instance: winston.Logger;

    public constructor() {
        const cloudwatchConfig = {
            name: 'cloud watch log',
            logGroupName: configProvider().CLOUDWATCH_GROUP_NAME,
            logStreamName: configProvider().CLOUDWATCH_LOG_STREAM_NAME,
            awsAccessKeyId: configProvider().AWS_ACCESS_KEY,
            awsSecretKey: configProvider().AWS_SECRET_KEY,
            awsRegion: configProvider().AWS_REGION,
            messageFormatter: ({ level, message, stack }) => {
                if (stack) {
                    return `[${level}]  :   ${message}\n -  ${stack}`;
                }

                return `[${level}]  :   ${message}`;
            }
        };

        const format = isDeploymentEnv()
            ? winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.json(),
                  winston.format.errors({ stack: true })
              )
            : winston.format.combine(
                  winston.format.colorize(),
                  winston.format.simple(),
                  winston.format.errors({ stack: true })
              );

        this.instance = winston.createLogger({
            level: 'info',
            silent: false,
            format,
            transports: [
                new winston.transports.Console({
                    stderrLevels: ['error']
                })
            ]
        });
        this.instance.add(new WinstonCloudWatch(cloudwatchConfig));
    }

    public info(message: string): void {
        this.instance.info(message);
    }

    public warn(message: string): void {
        this.instance.warn(message);
    }

    public error(message: string, error?: Error): void {
        this.instance.error(message, error);
    }
}
