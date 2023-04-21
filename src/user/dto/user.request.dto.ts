import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Pagination } from 'src/common/dto/base.request.dto';

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

export class PaginationWithSortRequestDto extends Pagination {
  @ApiPropertyOptional({
    example: 'createdAt',
  })
  @IsString()
  @IsIn(['name', 'email', 'createdAt'])
  @IsOptional()
  sortField?: string;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsString()
  @IsIn(['asc', 'desc'])
  @IsOptional()
  sortOrder?: string;
}

export class GetUsersRequestDto extends PaginationWithSortRequestDto {
  @ApiPropertyOptional({
    example: '이용기',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'andrew.yk82@gmail.com',
  })
  @IsString()
  @IsOptional()
  email?: string;
}
