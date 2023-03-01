import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { INestApplication, VersioningType } from '@nestjs/common';
import { ApplicationModule } from './modules/app.module';
import { CommonModule, LogInterceptor } from './modules/common';
import {
    SWAGGER_TITLE,
    SWAGGER_DESCRIPTION,
    SWAGGER_PREFIX,
    VERSION,
    API_DEFAULT_PREFIX
} from './modules/common/models/constants';
import { ConfigService } from '@nestjs/config';
import { IConfig } from './modules/common/interfaces/config.interface';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(ApplicationModule);

    app.setGlobalPrefix(API_DEFAULT_PREFIX);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'v'
    });

    app.enableCors();

    createSwagger(app);

    app.use(helmet());

    const logInterceptor = app.select(CommonModule).get(LogInterceptor);
    app.useGlobalInterceptors(logInterceptor);

    const port = app.get(ConfigService).get<IConfig>('API_PORT', {
        infer: true
    });

    await app.listen(port);
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
