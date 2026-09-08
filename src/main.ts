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

  // 🔹 CORS: Recomendado permitir el origen del frontend en producción
  app.enableCors({
    origin: process.env.FRONTEND_URL || true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 🔹 Swagger config
  const config = new DocumentBuilder()
    .setTitle('CORE API')
    .setDescription('API CORE')
    .setVersion('1.0')
    .addTag('users')
    .addTag('tasks')
    .addTag('roles')
    .addBearerAuth()
    .addServer('/') // 👈 Rutas relativas: funciona automáticamente en localhost y Render
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 🔹 Puerto dinámico para Render
  const port = process.env.PORT || 3000; // 👈 CRÍTICO: usa la variable PORT asignada por Render
  await app.listen(port, '0.0.0.0');
  console.log(`Servidor escuchando en el puerto ${port}`);
}
bootstrap();
