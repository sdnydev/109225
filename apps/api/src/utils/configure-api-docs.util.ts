import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureApiDocs(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('109225 API Documentation')
    .setVersion('V1')
    .addTag('fires')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
}
