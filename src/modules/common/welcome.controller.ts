import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Version,
    VERSION_NEUTRAL
} from '@nestjs/common';

@Controller()
export class WelcomeController {
    @Version(VERSION_NEUTRAL)
    @Get()
    @HttpCode(HttpStatus.OK)
    public login(): string {
        return 'Welcome, Build Version : 1.1';
    }
}
