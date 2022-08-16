import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../providers';

@Injectable()
export class LogInterceptor implements NestInterceptor {
    public constructor(private readonly logger: LoggerService) {}

    public intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
        const startTime = new Date().getTime();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const statusCode = ctx.getResponse().statusCode;
        const userId = request.user ? request.user.sub : '-';

        return next.handle().pipe(
            map((data) => {
                this.logger.info(
                    `${this.getTimeDelta(startTime)}ms ${userId} ${
                        request.ip
                    } ${statusCode} ${request.method} ${this.getUrl(request)}`
                );

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const response: any = {
                    data,
                    httpCode: statusCode,
                    path: request.url,
                    timestamp: new Date().toISOString
                };
                return response;
            })
        );
    }

    private getTimeDelta(startTime: number): number {
        return new Date().getTime() - startTime;
    }

    private getUrl(request: Request): string {
        return `${request.protocol}://${request.get('host')}${request.originalUrl}`;
    }
}
