import type { UserCreate } from '../types/User';
import { HTTPException } from 'hono/http-exception';
import UserService from '../service/userService';
import type { User } from '@prisma/client';
import type { Context } from 'hono';

export default class UserController {

  constructor(private userService: UserService) {}

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      const message = 'No se pudieron obtener los usuarios debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async createUser(user: UserCreate): Promise<void> {
    try {
      await this.userService.createUser(user);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      const message = 'No se pudo crear el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getUserById(userId: string): Promise<User | null> {
    try {
      return await this.userService.getUserById(userId);
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      const message = 'No se pudo obtener el usuario debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getUserResponseById(id: string, c: Context): Promise<Response> {
    try {
      if (!id) {
        return c.json({ message: 'Error con el id' }, 400);
      }

      const user = await this.getUserById(id);

      if (!user) {
        return c.json({ message: 'Usuario no encontrado' }, 404);
      }

      return c.json(user, 200);
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      return c.text('Error interno al obtener el usuario', 500);
    }
  }

  public async getAllUserResponse(c: Context): Promise<Response> {
    try {
      const users = await this.getAllUsers();
      return c.json(users, 200);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return c.text('Error interno al obtener usuarios', 500);
    }
  }

  public async createUserResponse(c: Context): Promise<Response> {
    try {
      const body = await c.req.json<UserCreate>();
      await this.createUser(body);
      return c.text('Usuario creado exitosamente', 201);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      return c.text('Error interno al crear el usuario', 500);
    }
  }
}
