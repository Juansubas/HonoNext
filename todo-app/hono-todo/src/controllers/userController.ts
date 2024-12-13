import type { Context } from "hono";
import type { UserService } from "../services/userService.js";
import type { createUserDto, updateUserDto, updateUserRoleDto, UserDto } from "../dtos/userDto.js";
import { HTTPException } from "hono/http-exception";

export class UserController {
  constructor(private userService: UserService) { }

  public async getUsers(c: Context): Promise<Response> {
    try {
      const users: UserDto[] = await this.userService.getUsers();

      if (!users || users.length === 0) {
        return c.json('Not Found Users', 404);
      }

      return c.json(users, 200);

    } catch (error: unknown) {
      console.error('Error al obtener el usuario:', error);
      const message = 'No se pudo obtener el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getUserById(c: Context): Promise<Response> {
    try {
      const userId = c.req.param('id')
      const user: UserDto | null = await this.userService.getUserById(Number(userId));

      if (!user ) {
        return c.json('Not Found Users', 404);
      }

      return c.json(user, 200);

    } catch (error: unknown) {
      console.error('Error al obtener el usuario:', error);
      const message = 'No se pudo obtener el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async createUser(c: Context): Promise<Response> {
    try {
      const user = await c.req.json<createUserDto>();
      await this.userService.createUser(user);
      return c.json('User Created', 201);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      const message = 'No se pudo crear el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async deleteUser(c: Context): Promise<Response> {
    try {
      const id = await c.req.param('id');
      await this.userService.deleteUser(Number(id));
      return c.json('User Deleted', 200);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      const message = 'No se pudo crear el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async updateUser(c: Context): Promise<Response> {
    try {
      const id = await c.req.param('id');
      const user = await c.req.json<updateUserDto>()

      if(Object.entries(user).length === 0){
        return c.json('Debe almenos actualizar un campo', 400);
      }

      await this.userService.updateUser(Number(id), user);
      return c.json('User Updated', 200);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      const message = 'No se pudo actualizar el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async updateUserRole(c: Context): Promise<Response> {
    try {
      const id = await c.req.param('id');
      const userRole = await c.req.json<updateUserRoleDto>()

      if(Object.entries(userRole).length === 0){
        return c.json('Debe almenos actualizar un campo', 400);
      }

      await this.userService.updateUserRole(Number(id), userRole.roleId);
      return c.json('User Role Updated', 200);
    } catch (error) {
      console.error('Error al actualizar el rol del usuario:', error);
      const message = 'No se pudo actualizar el role del usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }
}
