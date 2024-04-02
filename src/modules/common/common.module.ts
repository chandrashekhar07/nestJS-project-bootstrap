import { Global, Module } from '@nestjs/common';
import { LoggerService } from './services';

@Global()
@Module({
    imports: [],
    providers: [LoggerService],
    exports: [LoggerService],
    controllers: [],
})
export class CommonModule {}
