import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CAMERA_REPOSITORY } from '../../../domain/camera/repositories/camera.repository';
import type { CameraRepository } from '../../../domain/camera/repositories/camera.repository';
import { DeleteMultipleCamerasDto } from '../dto/delete-multiple-cameras.dto';

@Injectable()
export class DeleteMultipleCamerasUseCase {
  constructor(
    @Inject(CAMERA_REPOSITORY)
    private readonly cameraRepo: CameraRepository,
  ) {}

  async execute(dto: DeleteMultipleCamerasDto): Promise<void> {
    // Validar que existan todas las cámaras indicadas
    const cameras = await Promise.all(
      dto.ids.map((id) => this.cameraRepo.findById(id)),
    );

    const missing = cameras.filter((camera) => !camera);

    if (missing.length > 0) {
      throw new NotFoundException(
        'Algunas cámaras no existen o no fueron encontradas',
      );
    }

    await this.cameraRepo.deleteMany(dto.ids);
  }
}
