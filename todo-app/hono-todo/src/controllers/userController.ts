import type { Context } from "hono";
import type { UserService } from "../services/userService.js";
import type { createUserDto, UserDto } from "../dtos/userDto.js";
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

  public async createUser(c: Context): Promise<void> {
    try {
      const user = await c.req.json<createUserDto>();
      await this.userService.createUser(user);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      const message = 'No se pudo crear el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }
}
