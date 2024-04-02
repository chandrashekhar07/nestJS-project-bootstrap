import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatabaseTransaction = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        return context.switchToHttp().getRequest().transaction;
    },
);
