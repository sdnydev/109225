import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ApiPagedResponseMeta {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  count: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  page_count: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  page_size: number;
}
