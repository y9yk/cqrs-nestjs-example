import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoggedInResultDto {
  @ApiPropertyOptional({
    example: '이용기',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'andrew.yk82@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
