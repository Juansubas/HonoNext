import type { createRoleDto, roleDto, updateRoleDto } from "../dtos/roleDto";
import type { RoleRepository } from "../repositories/roleRepository";
import type { RoleRepositoryInterface } from "../types/role/roleRepositoryInterface";

export class RoleService implements RoleRepositoryInterface {

  constructor(private roleRepository: RoleRepository) { }

  public async createRole(role: createRoleDto): Promise<void> {
    try {
      await this.roleRepository.createRole(role);
    } catch (error: unknown) {
      throw new Error(`Error creating role from service: ${error}`);
    }
  }

  public async getRoles(): Promise<roleDto[]> {
    try {
      return await this.roleRepository.getRoles();
    } catch (error: unknown) {
      throw new Error(`Error fetching roles from service: ${error}`);
    }
  }

  public async getRoleById(roleId: number): Promise<roleDto | null> {
    try {
      return await this.roleRepository.getRoleById(roleId);
    } catch (error: unknown) {
      throw new Error(`Error fetching role from service: ${error}`);
    }
  }

  public async deleteRole(roleId: number): Promise<void> {
    try {
      await this.roleRepository.deleteRole(roleId);
    } catch (error: unknown) {
      throw new Error(`Error deleting role from service: ${error}`);
    }
  }

  public async updateRole(roleId: number, role: updateRoleDto): Promise<void> {
    try {
      await this.roleRepository.updateRole(roleId, role);
    } catch (error: unknown) {
      throw new Error(`Error updating role from service: ${error}`);
    }
  }

}