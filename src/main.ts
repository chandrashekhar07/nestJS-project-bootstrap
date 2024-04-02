import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import {
    ValidationPipe,
    VersioningType,
    type INestApplication,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationModule } from './modules/app.module';
import {
    API_DEFAULT_PREFIX,
    VERSION,
    swaggerConfig,
} from './modules/common/constants';
import type { IConfig } from './modules/common/interfaces/config.interface';
import { CoreModule } from './modules/core/core.module';
import { LogInterceptor } from './modules/core/interceptors';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(ApplicationModule);

    app.setGlobalPrefix(API_DEFAULT_PREFIX);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'v',
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true, // Strip out any properties that are not defined in the DTO
            forbidUnknownValues: false, // After class-validator v0.14.0, this is set to true by default. It will be great if we finalize the DTOs and set this to true. For now, we will leave it as false.
        }),
    );

    app.enableCors();
    app.use(helmet());

    createSwagger(app);

    const logInterceptor = app.select(CoreModule).get(LogInterceptor);
    app.useGlobalInterceptors(logInterceptor);

    const port = app.get(ConfigService).get<IConfig>('API_PORT', {
        infer: true,
    });

    await app.listen(port);
}

function createSwagger(app: INestApplication): void {
    const version = VERSION;
    const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.prefix, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}

// eslint-disable-next-line no-console, unicorn/prefer-top-level-await
bootstrap().catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
});
