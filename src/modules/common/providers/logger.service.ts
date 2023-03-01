import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { IConfig } from '../interfaces/config.interface';
import { isDeploymentEnv } from '../utilities';
@Injectable()
export class LoggerService {
    private readonly instance: winston.Logger;

    public constructor(private readonly configService: ConfigService<IConfig, true>) {
        const awsConfig = this.configService.get('aws', {
            infer: true
        });

        const cloudwatchConfig = {
            name: 'cloud watch log',
            logGroupName: awsConfig.cloudwatchGroupName,
            logStreamName: awsConfig.cloudwatchLogStreamName,
            awsAccessKeyId: awsConfig.accessKey,
            awsSecretKey: awsConfig.secretKey,
            awsRegion: awsConfig.region,
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
