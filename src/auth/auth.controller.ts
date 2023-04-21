import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login.request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './commands/impl/login.command';
import { LoginResponseDto } from './dto/login.response.dto';
import {
  BadRequesExceptionResponseDto,
  InternalServerErrorExceptionResponseDto,
  UnAuthorizedExceptionResponseDto,
} from 'src/common/dto/base.response.dto';

@ApiTags('Auth Service')
@ApiBadRequestResponse({ type: BadRequesExceptionResponseDto })
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionResponseDto,
})
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '사용자 로그인' })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({ type: UnAuthorizedExceptionResponseDto })
  @HttpCode(200)
  @Post('/login')
  public async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.commandBus.execute(new LoginCommand(dto.email, dto.password));
  }
}
