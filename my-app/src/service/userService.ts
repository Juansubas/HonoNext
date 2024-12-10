import type { User } from "@prisma/client";
import type UserRepository from "../repositories/userRepository";
import type { UserCreate } from "../types/User";
import hash from "../utils/bcrypt";

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

  public async createUser(User: UserCreate): Promise<void> {
    try {
      const passwordHash = await hash(User.password);
      User.password = passwordHash;
      await this.userRepository.createUser(User);
    } catch (error) {
      console.error('Error al obtener los usuarios en el service:', error);
      throw new Error('No se pudieron obtener los usuarios en el service');
    }
  }

  public async getUserById(userId : string): Promise<User | null> {
    try {
      return await this.userRepository.getUserById(Number(userId));
    } catch (error) {
      console.error(`Error en el Service User ${error}`);
      throw new Error('No se pudieron obtener los usuarios en el service');
    }
  }
}