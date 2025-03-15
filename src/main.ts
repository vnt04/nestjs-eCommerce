import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CommonExceptionFilter } from './exceptions/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  //add pipes for validation
  app.useGlobalPipes(new ValidationPipe());

  //exception filter in global
  app.useGlobalFilters(new CommonExceptionFilter());

  //Open API (Swagger)
  const config = new DocumentBuilder()
    .setTitle('eCommerce-Nestjs')
    .setDescription('eCommerce website by Nestjs')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  //listen to PORT
  const PORT = configService.get<string>('port');
  await app.listen(PORT ?? 3000, () => {
    console.log(`E-commerce server is running on port ${PORT}`);
  });
}
void bootstrap();
