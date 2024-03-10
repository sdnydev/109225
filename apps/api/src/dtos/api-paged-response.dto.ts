import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { ApiPagedResponseMeta } from './api-paged-response-meta.dto';

export class ApiPagedResponse<T> {
  @ApiProperty({ isArray: true })
  @IsArray()
  readonly data: T[];

  @ApiProperty()
  @Type(() => ApiPagedResponseMeta)
  readonly meta: ApiPagedResponseMeta;

  constructor(data: T[], meta: ApiPagedResponseMeta) {
    this.data = data;
    this.meta = meta;
  }
}
