import { IsNumber } from 'class-validator';

export class AppConfigDto {
  @IsNumber()
  PORT: number;
}
