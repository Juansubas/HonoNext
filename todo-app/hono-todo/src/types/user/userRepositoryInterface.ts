import type { Users } from "@prisma/client";
import type { createUserDto, updateUserDto, UserDto } from "../../dtos/userDto.js";

export interface UserRepositoryInterface{
  getUsers(): Promise<UserDto[]>;

  getUserById(userId: number): Promise<UserDto | null>

  getUserByEmail(email: string): Promise<Users | null>

  createUser(user: createUserDto): Promise<Users>;

  updateUser(userId: number, user: updateUserDto): Promise<void>;

  updateUserRole(userId: number, roleId: number) : Promise<void>;

  deleteUser(userId: number) : Promise<void>;
}