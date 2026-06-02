import { File } from '../entities/file.entity';
import { UpdateFileData } from '../types/update-file-data.type';
export const FILE_REPOSITORY = 'FileRepository';
export interface FileRepository {
  save(file: File): Promise<File>;
  findAll(): Promise<File[]>;
  findById(id: string): Promise<File | null>;
  update(id: string, data: UpdateFileData): Promise<File>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
}
