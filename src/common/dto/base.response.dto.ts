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

export class HttpExceptionResponseDto {
  @ApiProperty({
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    required: true,
  })
  message: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  error?: any;
}

export class BadRequesExceptionResponseDto extends HttpExceptionResponseDto {
  @ApiProperty({
    example: 400,
    required: true,
  })
  statusCode: number;
}

export class UnAuthorizedExceptionResponseDto extends HttpExceptionResponseDto {
  @ApiProperty({
    example: 401,
    required: true,
  })
  statusCode: number;
}

export class NotFoundExceptionResponseDto extends HttpExceptionResponseDto {
  @ApiProperty({
    example: 404,
    required: true,
  })
  statusCode: number;
}

export class ConflictExceptionResponseDto extends HttpExceptionResponseDto {
  @ApiProperty({
    example: 409,
    required: true,
  })
  statusCode: number;
}

export class InternalServerErrorExceptionResponseDto extends HttpExceptionResponseDto {
  @ApiProperty({
    example: 500,
    required: true,
  })
  statusCode: number;
}
