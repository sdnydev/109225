import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class ApiResponse {
  @ApiProperty()
  @IsObject()
  readonly data: Record<string, unknown>;

  constructor(data: Record<string, unknown>) {
    this.data = data;
  }
}
