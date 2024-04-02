import {
    Injectable,
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { Response } from 'express';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

import type { ILogConfig } from '../../common/interfaces';
import { LoggerService } from '../../common/services';
import { ANONYMOUS } from '../../common/constants';
import { DecoratorMetadataKeys } from '../../common/enums';

@Injectable()
export class LogInterceptor implements NestInterceptor {
    public constructor(
        private readonly logger: LoggerService,
        private readonly reflector: Reflector,
    ) {}

    public intercept(
        executionContext: ExecutionContext,
        next: CallHandler,
    ): Observable<Response> {
        const startTime = Date.now();
        const httpArgumentHost = executionContext.switchToHttp();
        const request = httpArgumentHost.getRequest();
        const { statusCode } = httpArgumentHost.getResponse();

        const email = request.user?.email ?? ANONYMOUS;

        //Log config of corresponding handler will get priority over the class/controller config
        const logConfig =
            this.reflector.get<ILogConfig | undefined>(
                DecoratorMetadataKeys.LOG_CONFIG,
                executionContext.getHandler(),
            ) ??
            this.reflector.get<ILogConfig | undefined>(
                DecoratorMetadataKeys.LOG_CONFIG,
                executionContext.getClass(),
            );

        return next.handle().pipe(
            tap((data) => {
                try {
                    this.logger.info(
                        `${this._getTimeDelta(
                            startTime,
                        )}ms ${email} ${statusCode} ${request.method} ${
                            request.url
                        };${
                            logConfig?.logRequestBody
                                ? ` Req body is: ${JSON.stringify(
                                      request.body,
                                  )};`
                                : ''
                        }${
                            logConfig?.logHeaders
                                ? ` Req headers are: ${JSON.stringify(
                                      request.headers,
                                  )};`
                                : ''
                        }${
                            logConfig?.logResponseBody
                                ? ` Res body is: ${JSON.stringify(data)};`
                                : ''
                        }`,
                    );
                } catch (error) {
                    this.logger.error(error);
                }
            }),
        );
    }

    private _getTimeDelta(startTime: number): number {
        return Date.now() - startTime;
    }
}
