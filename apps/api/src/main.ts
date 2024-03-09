import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigDto } from './dtos/app-config.dto';
import { configureApiDocs } from './utils/configure-api-docs.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AppConfigDto, true>);

  // Enable API Versioning
  app.enableVersioning();

  // Configure Swagger API Documentation
  configureApiDocs(app);

  await app.listen(configService.get('PORT'));
}
bootstrap();
