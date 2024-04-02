import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoggedInUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const { user } = context.switchToHttp().getRequest();

        return user ?? {};
    },
);
