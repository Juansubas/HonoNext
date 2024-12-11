import type { Users } from "@prisma/client";
import type { createUserDto, UserDto } from "../../dtos/userDto.js";

export interface UserServiceRepository{
  getUsers(): Promise<UserDto[]>;

  createUser(user: createUserDto): Promise<void>;
}