import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
