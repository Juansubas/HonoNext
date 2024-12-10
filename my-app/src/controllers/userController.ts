import type { UserCreate, UserUpdate } from '../types/User';
import { HTTPException } from 'hono/http-exception';
import UserService from '../service/userService';
import type { User } from '@prisma/client';
import type { Context } from 'hono';

export default class UserController {

  constructor(private userService: UserService) {}

  public async getAllUsers(c: Context): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();

      return c.json(users, 200);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      const message = 'No se pudieron obtener los usuarios debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async createUser(c: Context): Promise<void> {
    try {
      const user = await c.req.json<UserCreate>();
      await this.userService.createUser(user);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      const message = 'No se pudo crear el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getUserById(c: Context): Promise<Response> {
    try {
      const id: string = c.req.param('id');

      if (!id) {
        return c.json({ message: 'Error con el id' }, 400);
      }

      const user = await this.userService.getUserById(id);

      if (!user) {
        return c.json({ message: 'Usuario no encontrado' }, 404);
      }

      return c.json(user, 200);
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      return c.text('Error interno al obtener el usuario', 500);
    }
  }

  public async deleteUser(c: Context): Promise<Response> {
    try {
      const id: string = c.req.param('id');

      if (!id) {
        return c.json({ message: 'Error con el id' }, 400);
      }

      await this.userService.deleteUser(id);

      return c.json('User deleted', 200);
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      return c.text('Error interno al eliminar el usuario', 500);
    }
  }

  public async updateUser(c: Context): Promise<Response> {
    try {
      const id: string = c.req.param('id');

      if (!id) {
        return c.json({ message: 'Error con el id' }, 400);
      }

      const userUpdates = await c.req.json<UserUpdate>();

      if (!userUpdates) {
        return c.json({ message: 'Error con los datos' }, 400);
      }

      await this.userService.updateUser(id, userUpdates);
      return c.text('Usuario actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      return c.text('Error interno al actualizar el usuario', 500);
    }
  }
}
