import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CAMERA_REPOSITORY } from '../../../domain/camera/repositories/camera.repository';
import type { CameraRepository } from '../../../domain/camera/repositories/camera.repository';

@Injectable()
export class FindCameraByIdUseCase {
  constructor(
    @Inject(CAMERA_REPOSITORY)
    private readonly cameraRepo: CameraRepository,
  ) {}

  async execute(id: string) {
    const camera = await this.cameraRepo.findById(id);

    if (!camera) {
      throw new NotFoundException(
        'No existe ninguna cámara asociada a este ID',
      );
    }

    return camera;
  }
}
