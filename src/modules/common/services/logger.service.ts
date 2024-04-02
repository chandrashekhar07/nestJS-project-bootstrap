import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import type { IConfig } from '../interfaces/config.interface';
import { isDeployedEnvironment } from '../utilities';
import type { LogEntry } from 'winston';

@Injectable()
export class LoggerService {
    private readonly instance: winston.Logger;

    public constructor(
        private readonly configService: ConfigService<IConfig, true>,
    ) {
        const awsConfig = this.configService.get('aws', {
            infer: true,
        });

        const { cloudwatchGroupName, cloudwatchLogStreamName, region } =
            awsConfig;

        const cloudwatchConfig = {
            name: 'cloud watch log',
            logGroupName: cloudwatchGroupName,
            logStreamName: cloudwatchLogStreamName,
            awsRegion: region,
            messageFormatter: (logObject: LogEntry): string => {
                const { level, message, stack } = logObject;

                if (stack) {
                    return `[${level}]  :   ${message}\n -  ${stack}`;
                }

                return `[${level}]  :   ${message}`;
            },
        };

        const format = isDeployedEnvironment()
            ? winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.json(),
                  winston.format.errors({ stack: true }),
              )
            : winston.format.combine(
                  winston.format.colorize(),
                  winston.format.simple(),
                  winston.format.errors({ stack: true }),
              );

        this.instance = winston.createLogger({
            level: 'info',
            silent: false,
            format,
            transports: [
                new winston.transports.Console({
                    stderrLevels: ['error'],
                }),
            ],
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
