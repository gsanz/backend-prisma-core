import { Injectable, Inject } from '@nestjs/common';
import { CAMERA_REPOSITORY } from '../../../domain/camera/repositories/camera.repository';
import type { CameraRepository } from '../../../domain/camera/repositories/camera.repository';
import { Camera } from '../../../domain/camera/entities/camera.entity';
import { v4 as uuid } from 'uuid';
import { CreateCameraDto } from '../dto/create-camera.dto';

@Injectable()
export class CreateCameraUseCase {
  constructor(
    @Inject(CAMERA_REPOSITORY)
    private readonly cameraRepo: CameraRepository,
  ) {}

  async execute(dto: CreateCameraDto) {
    const camera = Camera.create(
      uuid(),
      dto.nombre,
      dto.latitud,
      dto.longitud,
      dto.url,
      dto.fuente,
      dto.fechaRegistro ?? new Date(),
    );

    return this.cameraRepo.save(camera);
  }
}
