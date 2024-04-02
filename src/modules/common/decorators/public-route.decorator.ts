import { SetMetadata, type CustomDecorator } from '@nestjs/common';
import { DecoratorMetadataKeys } from '../enums';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PublicRoute = (): CustomDecorator =>
    SetMetadata(DecoratorMetadataKeys.PUBLIC_ROUTE, true);
