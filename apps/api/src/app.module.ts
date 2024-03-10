import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FireModule } from './modules/fire/fire.module';
import { validateAppConfig } from './utils/validate-app-config.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateAppConfig,
    }),
    FireModule,
  ],
})
export class AppModule {}
