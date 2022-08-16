import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    forwardRef,
    Inject
} from '@nestjs/common';
import { ANONYMOUS } from './models/constants';
import { LoggerService } from './providers';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    public constructor(
        @Inject(forwardRef(() => LoggerService))
        private readonly loggerService: LoggerService
    ) {}

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const email = request.user ? request.user.sub : ANONYMOUS;

        this.loggerService.error(
            `${email} ${exception.status} ${request.method} ${request.url}`,
            exception
        );

        if (!exception.hasOwnProperty('response')) {
            this.raiseException(request, response, exception, exception?.message);

            return;
        }

        if (exception['response'].hasOwnProperty('error')) {
            const error = exception['response']['message']
                ? exception['response']['message']
                : exception['response']['error'];
            this.raiseException(request, response, exception, error);

            return;
        }

        this.raiseException(request, response, exception);
    }

    private raiseException(request: Request, response, exception, error = null): void {
        const message = exception.message ? exception.message : 'Internal server error';

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.BAD_REQUEST;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
            error: error !== null ? error : message
        });
    }
}
