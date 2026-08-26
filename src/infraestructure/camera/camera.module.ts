import { Module } from '@nestjs/common';

import { CreateCameraUseCase } from '../../application/camera/use-cases/create-camera.usecase';
import { FindAllCamerasUseCase } from '../../application/camera/use-cases/find-all-cameras.usecase';
import { FindCameraByIdUseCase } from '../../application/camera/use-cases/find-camera-by-id.usecase';
import { UpdateCameraUseCase } from '../../application/camera/use-cases/update-camera.usecase';
import { DeleteCameraUseCase } from '../../application/camera/use-cases/delete-camera.usecase';

import { CameraRepositoryImpl } from './persistence/camera.repository.impl';
import { CAMERA_REPOSITORY } from '../../domain/camera/repositories/camera.repository';

import { PrismaModule } from '../prisma/prisma.module';
import { CameraController } from './controllers/CameraController';
import { DeleteMultipleCamerasUseCase } from '../../application/camera/use-cases/delete-multiple-camera.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [CameraController],
  providers: [
    CreateCameraUseCase,
    FindAllCamerasUseCase,
    FindCameraByIdUseCase,
    UpdateCameraUseCase,
    DeleteCameraUseCase,
    DeleteMultipleCamerasUseCase,
    {
      provide: CAMERA_REPOSITORY,
      useClass: CameraRepositoryImpl,
    },
  ],
  exports: [
    CreateCameraUseCase,
    FindAllCamerasUseCase,
    FindCameraByIdUseCase,
    UpdateCameraUseCase,
    DeleteCameraUseCase,
    DeleteMultipleCamerasUseCase,
    CAMERA_REPOSITORY,
  ],
})
export class CameraModule {}
