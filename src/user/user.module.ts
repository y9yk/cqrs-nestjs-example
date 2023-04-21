import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../common/schemas/user.schema';
import { UserRepository } from './repositories/user.repository';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { SERVICE_DB_CONNECTION_NAME } from 'src/common/constants';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { UserService } from './services/user.service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      SERVICE_DB_CONNECTION_NAME,
    ),
  ],
  controllers: [UserController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    // service
    UserService,
    // repository
    UserRepository,
  ],
})
export class UserModule {}
