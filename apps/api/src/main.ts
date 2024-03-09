import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigDto } from './dtos/app-config.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AppConfigDto, true>);

  await app.listen(configService.get('PORT'));
}
bootstrap();
