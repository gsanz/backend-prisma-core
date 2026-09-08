import { Injectable, Inject } from '@nestjs/common';
import { CAMERA_REPOSITORY } from '../../../domain/camera/repositories/camera.repository';
import type { CameraRepository } from '../../../domain/camera/repositories/camera.repository';

@Injectable()
export class FindAllCamerasUseCase {
  constructor(
    @Inject(CAMERA_REPOSITORY)
    private readonly cameraRepo: CameraRepository,
  ) {}

  async execute(page: number, limit: number) {
    return this.cameraRepo.findAll(page, limit);
  }
}
