import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FireDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  OBJECTID: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  FIRE_ID: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  FIRE_YEAR: number;

  @ApiProperty()
  @Type(() => String)
  @IsString()
  FIRE_NUMBER: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  FIRE_CENTRE: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  ZONE: number;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  RESPONSE_TYPE_DESC?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  IGNITION_DATE?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  FIRE_OUT_DATE?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  FIRE_STATUS?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  FIRE_CAUSE?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  FIRE_TYPE?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  INCIDENT_NAME?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  GEOGRAPHIC_DESCRIPTION?: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  LATITUDE?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  LONGITUDE?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  CURRENT_SIZE?: number;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  FIRE_URL?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  FEATURE_CODE?: string;
}
