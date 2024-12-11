import type { Users } from "@prisma/client";
import type { createUserDto } from "../dtos/userDto.js";
import type { UserServiceRepository } from "../types/user/userServiceInterface.js";
import type { UserRepository } from "../repositories/userRepository.js";

export class UserService implements UserServiceRepository {
  constructor(private userRepository: UserRepository) {}

  public async getUsers(): Promise<Users[]> {
    try {
      const users = await this.userRepository.getUsers();
      return users;
    } catch (error: unknown) {
      throw new Error(`Failed to get users in service: ${error}`);
    }
  }

  public async createUser(user: createUserDto): Promise<void> {
    try {
      await this.userRepository.createUser(user);
    } catch (error: unknown) {
      throw new Error(`Failed to create user in service: ${error}`);
    }
  }
}
