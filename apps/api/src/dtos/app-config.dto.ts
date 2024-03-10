import { IsNumber, IsString, IsUrl } from 'class-validator';

export class AppConfigDto {
  @IsString()
  DATABASE_URL: string;

  @IsNumber()
  PORT: number;

  @IsUrl()
  WILDFIRE_API_URL: string;
}
