import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { AppConfigDto } from '../../dtos/app-config.dto';

@Controller('health')
export class HealthController {
  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
//
