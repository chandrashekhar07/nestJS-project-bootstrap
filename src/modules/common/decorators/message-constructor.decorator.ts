import { SetMetadata, type CustomDecorator } from '@nestjs/common';
import { DecoratorMetadataKeys } from '../enums';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MessageConstructor = (...input: string[]): CustomDecorator =>
    SetMetadata(DecoratorMetadataKeys.MESSAGE_CONSTRUCTOR, input);
