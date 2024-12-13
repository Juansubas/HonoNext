import type { Users } from "@prisma/client";
import type { createUserDto, updateUserDto, UserDto } from "../dtos/userDto.js";
import type { UserServiceRepository } from "../types/user/userServiceInterface.js";
import type { UserRepository } from "../repositories/userRepository.js";
import { encryptPassword } from "./bcrypt.js";

export class UserService implements UserServiceRepository {
  constructor(private userRepository: UserRepository) {}
  
  public async getUserById(userId: number): Promise<UserDto | null> {
    try {
      const user = await this.userRepository.getUserById(userId);
      return user;
    } catch (error: unknown) {
      throw new Error(`Failed to get user in service: ${error}`);
    }
  }

  public async getUserByEmail(email: string): Promise<Users | null> {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      return user;
    } catch (error: unknown) {
      throw new Error(`Failed to get user in service: ${error}`);
    }
  }

  public async getUsers(): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.getUsers();
      return users;
    } catch (error: unknown) {
      throw new Error(`Failed to get users in service: ${error}`);
    }
  }

  public async createUser(user: createUserDto): Promise<void> {
    try {
      user.password = await encryptPassword(user.password);
      await this.userRepository.createUser(user);
    } catch (error: unknown) {
      throw new Error(`Failed to create user in service: ${error}`);
    }
  }

  public async updateUser(userId: number, user: updateUserDto): Promise<void> {
    try {
      await this.userRepository.updateUser(userId, user);
    } catch (error: unknown) {
      throw new Error(`Failed to update user in service: ${error}`);
    }
  }

  public async updateUserRole(userId: number, roleId: number): Promise<void> {
    try {
      await this.userRepository.updateUserRole(userId, roleId);
    } catch (error: unknown) {
      throw new Error(`Failed to update user Role in service: ${error}`);
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    try {
      await this.userRepository.deleteUser(userId);
    } catch (error: unknown) {
      throw new Error(`Failed to delete user in service: ${error}`);
    }
  }
}
