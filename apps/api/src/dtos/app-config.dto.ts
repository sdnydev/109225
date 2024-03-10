import { IsNumber, IsUrl } from 'class-validator';

export class AppConfigDto {
  @IsNumber()
  PORT: number;

  @IsUrl()
  WILDFIRE_API_URL: string;
}
