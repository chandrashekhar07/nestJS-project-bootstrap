import { SetMetadata, type CustomDecorator } from '@nestjs/common';
import { DecoratorMetadataKeys } from '../enums';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResponseMessage = (...input: string[]): CustomDecorator =>
    SetMetadata(DecoratorMetadataKeys.RESPONSE_MESSAGE, input);
