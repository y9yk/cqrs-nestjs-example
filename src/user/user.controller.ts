import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery, GetUsersQuery } from './queries/impl';
import { User } from './schemas/user.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.request.dto';
import { CreateUserCommand } from './commands/impl/create-user.command';

@ApiTags('User Service')
@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: '사용자 생성' })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(dto.name, dto.email, dto.password),
    );
  }

  @ApiOperation({ summary: '사용자 조회' })
  @Get()
  async getAll(): Promise<User> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @ApiOperation({ summary: '사용자 조회(이메일)' })
  @Get('/email/:email')
  async getByEmail(@Param('email') email: string): Promise<User> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }
}
