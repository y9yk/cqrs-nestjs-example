import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

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
  @IsBoolean()
  deleted: boolean;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
