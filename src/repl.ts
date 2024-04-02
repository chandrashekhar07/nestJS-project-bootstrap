import { repl } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';

async function bootstrap(): Promise<void> {
    const replServer = await repl(ApplicationModule);
    replServer.setupHistory('.nestjs_repl_history', (error) => {
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
