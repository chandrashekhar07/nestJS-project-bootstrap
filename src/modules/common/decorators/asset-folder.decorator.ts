import { SetMetadata, type CustomDecorator } from '@nestjs/common';
import { DecoratorMetadataKeys } from '../enums';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AssetsFolder = (...input: string[]): CustomDecorator =>
    SetMetadata(DecoratorMetadataKeys.ASSET_FOLDER, input);
