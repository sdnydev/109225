import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FireFilters {
  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  @IsOptional()
  fireCause?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  @IsOptional()
  fireStatus?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  @IsOptional()
  geographicDescription?: string;
}

export const FireFilter = createParamDecorator(
  (data: unknown, context: ExecutionContext): FireFilters => {
    const request = context.switchToHttp().getRequest();

    return {
      fireCause: request.query.fire_cause,
      fireStatus: request.query.fire_status,
      geographicDescription: request.query.geographic_description,
    };
  },
  [
    (target: unknown, targetKey: string | symbol) => {
      ApiQuery({
        name: 'fire_cause',
        required: false,
        schema: { type: 'string' },
      })(target, targetKey, Object.getOwnPropertyDescriptor(target, targetKey));
      ApiQuery({
        name: 'fire_status',
        required: false,
        schema: { type: 'string' },
      })(target, targetKey, Object.getOwnPropertyDescriptor(target, targetKey));
      ApiQuery({
        name: 'geographic_description',
        required: false,
        schema: { type: 'string' },
      })(target, targetKey, Object.getOwnPropertyDescriptor(target, targetKey));
    },
  ],
);
