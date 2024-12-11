import type { Users } from "@prisma/client";

export interface UserRepositoryInterface{
  getUsers(): Promise<Users[]>;

  createUser(user: createUserDto): Promise<void>;
}