import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ResponseDto {
  @ApiProperty({
    example: 200,
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Success',
    required: true,
  })
  message: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  results?: any;
}
