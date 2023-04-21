import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: '이용기',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'andrew.yk82@gmail.com',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  password: string;
}
