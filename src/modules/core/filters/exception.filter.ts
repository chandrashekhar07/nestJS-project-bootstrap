import {
    Catch,
    HttpException,
    HttpStatus,
    type ExceptionFilter,
    type ArgumentsHost,
} from '@nestjs/common';
import type { Response } from 'express';
import { LoggerService } from '../../common/services';
import { ANONYMOUS } from '../../common/constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    public constructor(private readonly loggerService: LoggerService) {}

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public catch(exception: any, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const email = request.user ? request.user.email : ANONYMOUS;

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.BAD_REQUEST;

        const path = request.url;

        this.loggerService.error(
            `${status} ${request.method} ${
                request.url
            }; Request body is: ${JSON.stringify(
                request.body,
            )}; Request headers are: ${JSON.stringify(
                request.headers,
            )}; Request email is: ${email};`,
            exception,
        );

        // eslint-disable-next-line no-prototype-builtins
        if (exception.hasOwnProperty('response')) {
            const { response: exceptionResponse } = exception;

            const message = Array.isArray(exceptionResponse.message)
                ? // eslint-disable-next-line no-magic-numbers
                  exceptionResponse.message[0]
                : exceptionResponse.message;

            this._raiseException(
                path,
                response,
                status,
                exceptionResponse.error,
                message,
            );

            return;
        }

        // eslint-disable-next-line no-prototype-builtins
        if (exception.hasOwnProperty('errors')) {
            const { errors } = exception;

            const message = Array.isArray(errors)
                ? // eslint-disable-next-line no-magic-numbers
                  errors[0].message
                : exception.message;

            this._raiseException(path, response, status, errors, message);

            return;
        }

        this._raiseException(
            path,
            response,
            status,
            exception.message,
            exception.message,
        );
    }

    private _raiseException(
        path: string,
        response: Response,
        status: HttpStatus,
        error: unknown = undefined,
        message: string | null | undefined = undefined,
    ): void {
        if (!message) {
            message =
                status === HttpStatus.TOO_MANY_REQUESTS
                    ? 'Too many requests, please try again later'
                    : 'Internal server error';
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path,
            message,
            error: error ?? message,
        });
    }
}
