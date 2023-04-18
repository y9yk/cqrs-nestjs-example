import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { validationScheme } from './config/validation';
import { AppController } from './app.controller';
import { HealthModule } from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './config/configuration';
import { HttpLoggingMiddleware } from './common/middlewares/http.logging.middleware';

@Module({})
export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        ConfigModule.forRoot({
          envFilePath: `config/.${process.env.NODE_ENV}.env`,
          load: [configuration],
          validationSchema: validationScheme,
          isGlobal: true,
        }),
        MongooseModule.forRootAsync({
          inject: [ConfigService],
          connectionName: 'eventstore',
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('db.eventstore.uri'),
          }),
        }),
        MongooseModule.forRootAsync({
          inject: [ConfigService],
          connectionName: 'service',
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('db.service.uri'),
          }),
        }),
        HealthModule,
        AuthModule,
        UserModule,
      ],
      controllers: [AppController],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggingMiddleware).forRoutes('*');
  }
}
