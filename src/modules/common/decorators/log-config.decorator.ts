import { SetMetadata, type CustomDecorator } from '@nestjs/common';
import { DecoratorMetadataKeys } from '../enums';
import type { ILogConfig } from '../interfaces';

/**
 * This decorator/configuration is only valid for success responses.
 * For error responses, we will log everything. (for now)
 *
 * Also, in case of success response, we will always log info like request url, method, user,     response code, etc.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LogConfig = (
    input: ILogConfig,
): CustomDecorator<typeof DecoratorMetadataKeys.LOG_CONFIG> =>
    SetMetadata<typeof DecoratorMetadataKeys.LOG_CONFIG, ILogConfig>(
        DecoratorMetadataKeys.LOG_CONFIG,
        input,
    );
