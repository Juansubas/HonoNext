import type { User } from "@prisma/client";
import type UserRepository from "../repositories/userRepository";

export default class UserService {
  constructor(private userRepository: UserRepository) {
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw new Error('No se pudieron obtener los usuarios');
    }
  }
}