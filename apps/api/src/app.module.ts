import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateAppConfig } from './utils/validate-app-config.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateAppConfig,
    }),
  ],
})
export class AppModule {}
