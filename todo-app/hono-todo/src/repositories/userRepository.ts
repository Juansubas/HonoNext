import type { Users } from "@prisma/client";
import type { UserRepositoryInterface } from "../types/user/userRepositoryInterface.js";
import { prisma } from "../utils/prisma.js";
import type { createUserDto } from "../dtos/userDto.js";

export class UserRepository implements UserRepositoryInterface {
  public async getUsers(): Promise<Users[]> {
    try {
      const users = await prisma.users.findMany();
      return users;
    } catch (error: unknown) {
      throw new Error(`Error fetching users from repository: ${error}`);
    }
  }

  public async createUser(user: createUserDto): Promise<void> {
    try {
      await prisma.users.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          email: user.email,
          phone: user.phone,
          birthDate: user.birthDate
        }
      });
    } catch (error: unknown) {
      throw new Error(`Error creating user in repository: ${error}`);
    }
  }
}
