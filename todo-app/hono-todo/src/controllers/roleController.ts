import type { Context } from "hono";
import type { RoleService } from "../services/roleService";
import type { createRoleDto, roleDto, updateRoleDto } from "../dtos/roleDto";
import { HTTPException } from "hono/http-exception";

export class RoleController {
  constructor(private roleService: RoleService) { }

  public async createRole(c: Context): Promise<Response> {
    try {
      const body: createRoleDto = await c.req.json<createRoleDto>();
      await this.roleService.createRole(body);
      return c.json('Creado el rol', 201);
    } catch (error: unknown) {
      console.error('Error al crear el rol:', error);
      const message = 'No se pudo crear el rol debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getRoles(c: Context): Promise<Response> {
    try {
      const roles: roleDto[] = await this.roleService.getRoles();

      if (!roles) {
        return c.json('not found roles', 404);
      }

      return c.json(roles, 200);
    } catch (error: unknown) {
      console.error('Error al crear el rol:', error);
      const message = 'No se pudo obtener el rol debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getRoleById(c: Context): Promise<Response> {
    try {
      const id: string = c.req.param('id');

      const role: roleDto | null = await this.roleService.getRoleById(Number(id));

      if (!role) {
        return c.json('not found role', 404);
      }

      return c.json(role, 200);
    } catch (error: unknown) {
      console.error('Error al crear el rol:', error);
      const message = 'No se pudo obtener el rol debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async deleteRole(c: Context): Promise<Response> {
    try {
      const id: string = c.req.param('id');

      await this.roleService.deleteRole(Number(id));

      return c.json('Role Deleted', 200);
    } catch (error: unknown) {
      console.error('Error al eliminar el rol:', error);
      const message = 'No se pudo eliminar el rol debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async updateRole(c: Context): Promise<Response> {
    try {
      const id = await c.req.param('id');
      const role = await c.req.json<updateRoleDto>()

      await this.roleService.updateRole(Number(id), role);

      if (Object.entries(role).length === 0) {
        return c.json('Debe almenos actualizar un campo', 400);
      }

      return c.json('Role updated', 200);
    } catch (error: unknown) {
      console.error('Error al eliminar el rol:', error);
      const message = 'No se pudo actualizar el rol debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }
}