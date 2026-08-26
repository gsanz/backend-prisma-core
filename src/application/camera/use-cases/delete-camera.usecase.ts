import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CAMERA_REPOSITORY } from '../../../domain/camera/repositories/camera.repository';
import type { CameraRepository } from '../../../domain/camera/repositories/camera.repository';

@Injectable()
export class DeleteCameraUseCase {
  constructor(
    @Inject(CAMERA_REPOSITORY)
    private readonly cameraRepo: CameraRepository,
  ) {}

  async execute(id: string) {
    const user = await this.cameraRepo.findById(id);

    if (!user) {
      throw new NotFoundException('No hay ningún id asociado');
    }
    return this.cameraRepo.delete(id);
  }
}
