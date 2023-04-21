import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('영화 업로드')
    .setDescription(
      '테스트용 서버. 이상한 짓 하면 서버가 사라질 겁니다~ 절대 실제로 사용하는 비밀번호를 넣지 마세요! 암호화 별로 빡시게 안 걸었어요!',
    )
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Swagger UI에 대한 path를 연결함
  // .setup('swagger ui endpoint', app, swagger_document)
  SwaggerModule.setup('api-docs', app, document);

  // Adds a validator which automatically removes any undefined properties from payloads of clients.
  // and transforms payloads to be objects typed according to DTO classes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
