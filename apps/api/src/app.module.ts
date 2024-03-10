import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FireModule } from './modules/fire/fire.module';
import { validateAppConfig } from './utils/validate-app-config.util';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateAppConfig,
    }),
    FireModule,
    HealthModule,
  ],
})
export class AppModule {}
