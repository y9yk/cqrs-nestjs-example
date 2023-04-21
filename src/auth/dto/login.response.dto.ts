import { ResponseDto } from 'src/common/dto/base.response.dto';
import { LoggedInResultDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class LoginResponseDto extends ResponseDto {
  @ApiProperty({
    required: false,
    type: LoggedInResultDto,
  })
  @IsOptional()
  results?: LoggedInResultDto;
}
