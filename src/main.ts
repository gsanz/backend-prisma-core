import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

    app.enableCors({
    origin: true, // O true para permitir cualquier origen en desarrollo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 🔹 Swagger config
  const config = new DocumentBuilder()
    .setTitle('CORE API')
    .setDescription('API CORE')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  //await app.listen(process.env.PORT ?? 3000);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
