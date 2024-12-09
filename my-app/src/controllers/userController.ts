import type { Context } from 'hono';
import type UserService from '../service/userService';
import type { User } from '@prisma/client';
import { HTTPException } from 'hono/http-exception';
import type { UserCreate } from '../types/User';

export default class userController {

  constructor(private userService: UserService){}

  public async getAllUsers() : Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      const message = 'No se pudieron obtener los usuarios debido a un error interno.';
      throw new HTTPException(500, { message, cause: error})
    }
  }
  
  public async createUser(User : UserCreate) : Promise<void> {
    try {
      return await this.userService.createUser(User);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      const message = 'No se pudieron obtener los usuarios debido a un error interno.';
      throw new HTTPException(500, { message, cause: error})
    }
  }
}


