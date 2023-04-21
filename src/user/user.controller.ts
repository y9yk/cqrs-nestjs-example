import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from './queries/impl';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateUserRequestDto,
  GetUsersRequestDto,
} from './dto/user.request.dto';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GetUsersResponseDto } from './dto/user.response.dto';
import {
  BadRequesExceptionResponseDto,
  InternalServerErrorExceptionResponseDto,
  UnAuthorizedExceptionResponseDto,
} from 'src/common/dto/base.response.dto';

@ApiTags('User Service')
@ApiBadRequestResponse({ type: BadRequesExceptionResponseDto })
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionResponseDto,
})
@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: '사용자 생성' })
  @ApiResponse({
    status: 200,
  })
  @HttpCode(200)
  @Post('/create')
  async create(@Body() dto: CreateUserRequestDto) {
    return this.commandBus.execute(
      new CreateUserCommand(dto.name, dto.email, dto.password),
    );
  }

  @ApiOperation({ summary: '사용자 조회' })
  @ApiBearerAuth('AccessToken')
  @ApiResponse({
    status: 200,
    type: GetUsersResponseDto,
  })
  @ApiUnauthorizedResponse({ type: UnAuthorizedExceptionResponseDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('/get')
  async getUsers(
    @Query() dto: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    return this.queryBus.execute(
      new GetUsersQuery(
        dto.name,
        dto.email,
        dto.page,
        dto.size,
        dto.sortField,
        dto.sortOrder,
      ),
    );
  }
}
