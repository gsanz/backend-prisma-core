import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './infraestructure/test/controllers/app.controller';
import { AppService } from './domain/test/services/app.service';
import { UserModule } from './infraestructure/user/user.module';
import { AuthModule } from './infraestructure/auth/auth.module';
import { CameraModule } from './infraestructure/camera/camera.module';
import { TaskModule } from './infraestructure/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en toda la app
    }),
    UserModule,
    AuthModule,
    CameraModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
