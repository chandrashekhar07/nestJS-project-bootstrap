import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { INestApplication, VersioningType } from '@nestjs/common';
import { ApplicationModule } from './modules/app.module';
import { CommonModule, LogInterceptor } from './modules/common';
import { configProvider } from './modules/common/providers';
import {
    SWAGGER_TITLE,
    SWAGGER_DESCRIPTION,
    SWAGGER_PREFIX,
    VERSION
} from './modules/common/models/constants';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(ApplicationModule);

    app.setGlobalPrefix(configProvider().API_PREFIX);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'v'
    });

    app.enableCors();

    if (configProvider().SWAGGER_ENABLE) {
        createSwagger(app);
    }

    app.use(helmet());

    const logInterceptor = app.select(CommonModule).get(LogInterceptor);
    app.useGlobalInterceptors(logInterceptor);

    await app.listen(configProvider().API_PORT);
}

function createSwagger(app: INestApplication) {
    const version = VERSION;
    const options = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .setVersion(version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

// eslint-disable-next-line no-console
bootstrap().catch((err) => console.error(err));
