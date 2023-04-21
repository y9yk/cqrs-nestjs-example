import { ResponseDto } from 'src/common/dto/base.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class GetUsersResponseDto extends ResponseDto {
  @ApiProperty({
    required: false,
    type: [UserDto],
  })
  @IsOptional()
  results?: [UserDto];
}
