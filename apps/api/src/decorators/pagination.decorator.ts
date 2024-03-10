import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationParams {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number;
}

export const Pagination = createParamDecorator(
  (data: unknown, context: ExecutionContext): PaginationParams => {
    const request = context.switchToHttp().getRequest();

    const page = parseInt(request.query.page, 10) || 1;
    const pageSize = parseInt(request.query.pageSize, 10) || 10;

    return {
      page: page >= 1 ? page : 1,
      pageSize: pageSize >= 1 ? pageSize : 1,
    };
  },
  [
    (target: unknown, targetKey: string | symbol) => {
      ApiQuery({
        name: 'page',
        required: false,
        schema: { default: 1, type: 'number', minimum: 1 },
      })(target, targetKey, Object.getOwnPropertyDescriptor(target, targetKey));
      ApiQuery({
        name: 'page_size',
        required: false,
        schema: { default: 10, type: 'number', minimum: 1 },
      })(target, targetKey, Object.getOwnPropertyDescriptor(target, targetKey));
    },
  ],
);
