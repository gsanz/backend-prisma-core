import { Role } from '../entities/role.entity';
import { UpdateRoleData } from '../types/update-role-data.type';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

export const ROLE_REPOSITORY = 'RoleRepository';

export interface RoleRepository {
  save(role: Role): Promise<Role>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Role>>;
  findById(id: string): Promise<Role | null>;
  findByNombre(nombre: string): Promise<Role | null>;
  update(id: string, data: UpdateRoleData): Promise<Role>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
}
