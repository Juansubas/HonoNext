import type { createRoleDto, roleDto, updateRoleDto } from "../../dtos/roleDto";

export interface RoleRepositoryInterface {
  createRole(role: createRoleDto) : Promise<void>;
  getRoles(): Promise<roleDto[]>;
  getRoleById(roleId: number): Promise<roleDto | null>;
  deleteRole(roleId: number): Promise<void>;
  updateRole(roleId: number, role : updateRoleDto) : Promise<void>;
}