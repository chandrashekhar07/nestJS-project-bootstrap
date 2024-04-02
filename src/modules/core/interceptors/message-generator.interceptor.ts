import {
    Injectable,
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { DecoratorMetadataKeys } from '../../common/enums';

@Injectable()
export class MessageGeneratorInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<{
        message: string;
        data: unknown;
    }> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            map((data) => {
                let message = 'Success';

                // Give priority to the message set in the response's body/data
                const isMessageAlreadySet: boolean =
                    data && typeof data === 'object' && 'message' in data;

                if (isMessageAlreadySet) {
                    ({ message } = data);
                } else {
                    //Get the message set in the method handler decorator (if any)
                    const messageFromDecorator = this.reflector.get<
                        string | undefined
                    >(
                        DecoratorMetadataKeys.RESPONSE_MESSAGE,
                        context.getHandler(),
                    );

                    // eslint-disable-next-line no-magic-numbers
                    if (messageFromDecorator?.[0]) {
                        // eslint-disable-next-line no-magic-numbers
                        return {
                            // eslint-disable-next-line no-magic-numbers
                            message: messageFromDecorator[0],
                            data,
                            success: true,
                        };
                    }

                    //Get the message set in the class decorator if any
                    const key = this.reflector.get<string[] | undefined>(
                        DecoratorMetadataKeys.RESPONSE_MESSAGE,
                        context.getClass(),
                    );

                    if (key?.length) {
                        //Generate the generic message based on the key provided in the decorator
                        switch (request.method) {
                            case 'POST': {
                                message = `New ${key} added successfully`;
                                break;
                            }

                            case 'PATCH':
                            case 'PUT': {
                                message = `${key} updated successfully`;
                                break;
                            }

                            case 'DELETE': {
                                message = `${key} deleted successfully`;
                                break;
                            }

                            case 'GET': {
                                message = `${key} fetched successfully`;
                                break;
                            }

                            default: {
                                break;
                            }
                        }
                    }
                }

                return { message, data, success: true };
            }),
        );
    }
}
