import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';

async function bootstrap() {
  // create app and get config
  const app = await NestFactory.create(AppModule.forRoot());
  const config = app.get<ConfigService>(ConfigService);

  // global setting (validator, filter, interceptor, guard)
  // validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get('service.name'))
    .setDescription(
      `CQRS Implementation Example using Nest.js`,
    )
    .setVersion(`1.0`)
    .addBearerAuth(
      {
        description: 'Please enter token in following format: Bearer <JWT>',
        name: 'Authorization',
        bearerFormat: 'JWT',
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      },
      'AccessToken',
    )
    .build();
  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('docs', app, swaggerDocument);

  // create server
  // and setting socket opt. (important! must be set keep_alive_timeout to socket)
  const server = await app.listen(config.get('service.port'), () => {
    console.log(`${config.get('service.name')} Service Launched.`);
  });

  server.keepAliveTimeout = config.get('service.keep_alive_timeout') * 1000;
  server.headersTimeout =
    (config.get('service.keep_alive_timeout') + 10) * 1000;
}
bootstrap();
