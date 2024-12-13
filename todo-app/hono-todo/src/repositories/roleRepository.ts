import type { createRoleDto, roleDto, updateRoleDto } from "../dtos/roleDto.js";
import type { RoleRepositoryInterface } from "../types/role/roleRepositoryInterface.js";
import { prisma } from "../utils/prisma.js";

export class RoleRepository implements RoleRepositoryInterface {
  public async createRole(role: createRoleDto) : Promise<void> {
    try {
      await prisma.roles.create({
        data: {
          name: role.name,
          description: role.description
        }
      })
    } catch (error: unknown) {
      throw new Error(`Error creating role from repository: ${error}`);
    }
  }

  public async getRoles(): Promise<roleDto[]> {
    try {
      return await prisma.roles.findMany();
    } catch (error: unknown) {
      throw new Error(`Error fetching roles from repository: ${error}`);
    }
  }

  public async getRoleById(roleId: number): Promise<roleDto | null>{
    try {
      return await prisma.roles.findUnique({
        where: {
          id: roleId
        }
      })
    } catch (error: unknown) {
      throw new Error(`Error fetching role from repository: ${error}`);
    }
  }

  public async deleteRole(roleId: number): Promise<void>{
    try {
      await prisma.roles.delete({
        where: {
          id: roleId
        }
      });
    } catch (error : unknown) {
      throw new Error(`Error deleting role from repository: ${error}`);
    }
  }

  public async updateRole(roleId: number, role : updateRoleDto) : Promise<void>{
    try {
      await prisma.roles.update({
        where: {
          id: roleId
        },
        data: role
      })
    } catch (error : unknown) {
      throw new Error(`Error updating role from repository: ${error}`);
    }
  }
}