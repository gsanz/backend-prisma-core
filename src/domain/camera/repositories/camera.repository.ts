import { Camera } from '../entities/camera.entity';
import { UpdateCameraData } from '../types/update-camera-data.type';
export const CAMERA_REPOSITORY = 'CameraRepository';
export interface CameraRepository {
  save(camera: Camera): Promise<Camera>;
  findAll(): Promise<Camera[]>;
  findById(id: string): Promise<Camera | null>;
  update(id: string, data: UpdateCameraData): Promise<Camera>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
}
