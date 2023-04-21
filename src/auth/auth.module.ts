import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthRepository } from './repositories/auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schemas/user.schema';
import { SERVICE_DB_CONNECTION_NAME } from 'src/common/constants';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      SERVICE_DB_CONNECTION_NAME,
    ),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('security.jwt.secret'),
        signOptions: {
          expiresIn: configService.get<number>('security.jwt.expiresIn'),
        },
      }),
    }),
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    // service and strategy
    AuthService,
    JwtStrategy,
    // repostiroy
    AuthRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
