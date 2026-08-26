import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CAMERA_REPOSITORY } from '../../../domain/camera/repositories/camera.repository';
import type { CameraRepository } from '../../../domain/camera/repositories/camera.repository';

import { UpdateCameraDto } from '../dto/update-camera.dto';
import { UpdateCameraData } from '../../../domain/camera/types/update-camera-data.type';

@Injectable()
export class UpdateCameraUseCase {
  constructor(
    @Inject(CAMERA_REPOSITORY)
    private readonly cameraRepo: CameraRepository,
  ) {}

  async execute(id: string, dto: UpdateCameraDto) {
    // 1. Comprobar que existe
    const existingCamera = await this.cameraRepo.findById(id);

    if (!existingCamera) {
      throw new NotFoundException(
        'No existe ninguna cámara asociada a este ID',
      );
    }

    // 2. Mapear DTO → Dominio
    const data: UpdateCameraData = {
      nombre: dto.nombre,
      latitud: dto.latitud,
      longitud: dto.longitud,
      url: dto.url,
      fuente: dto.fuente,
      fechaRegistro: dto.fechaRegistro,
    };

    // 3. Actualizar
    return this.cameraRepo.update(id, data);
  }
}
