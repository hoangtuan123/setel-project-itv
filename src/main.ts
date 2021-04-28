import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DispatchError } from './common/dispatch-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DispatchError());
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Order service')
    .setDescription('Order service')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('v1', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
