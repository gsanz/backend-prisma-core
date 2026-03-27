import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './infraestructure/test/controllers/app.controller';
import { AppService } from './domain/test/services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en toda la app
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
