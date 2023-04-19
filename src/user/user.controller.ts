import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery, GetUsersQuery } from './queries/impl';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getAll(): Promise<User> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get('/email/:email')
  async getByEmail(@Param('email') email: string): Promise<User> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }
}
