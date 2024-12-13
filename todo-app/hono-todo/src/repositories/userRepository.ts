import type { Users } from "@prisma/client";
import type { UserRepositoryInterface } from "../types/user/userRepositoryInterface.js";
import { prisma } from "../utils/prisma.js";
import type { createUserDto, updateUserDto, UserDto } from "../dtos/userDto.js";

export class UserRepository implements UserRepositoryInterface {

  public async getUserById(userId: number): Promise<UserDto | null> {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId
        },
        select:{
          id: true,
          roleId: true,
          firstName: true,
          lastName: true,
          password: false,
          age: true,
          email: true,
          phone: true,
          birthDate: true,
          createdAt: true,
          updatedAt: true        
        }
      });

      return user;
    } catch (error: unknown) {
      throw new Error(`Error fetching users from repository: ${error}`);
    }
  }

  public async getUserByEmail(email: string): Promise<Users | null> {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email
        }
      });

      return user;
    } catch (error: unknown) {
      throw new Error(`Error fetching users from repository: ${error}`);
    }
  }

  public async getUsers(): Promise<UserDto[]> {
    try {
      const users = await prisma.users.findMany({
        select:{
          id: true,
          firstName: true,
          roleId: true,
          lastName: true,
          password: false,
          age: true,
          email: true,
          phone: true,
          birthDate: true,
          createdAt: true,
          updatedAt: true        
        }
      });
      return users;
    } catch (error: unknown) {
      throw new Error(`Error fetching users from repository: ${error}`);
    }
  }

  public async createUser(user: createUserDto): Promise<Users> {
    try {
      return await prisma.users.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
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

  public async updateUser(userId: number, user: updateUserDto): Promise<void> {
    try {
      await prisma.users.update({
        where: {
          id: userId
        },
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          age: user.age,
          phone: user.phone,
          birthDate: user.birthDate
        }
      });
    } catch (error: unknown) {
      throw new Error(`Error updating user in repository: ${error}`);
    }
  }

  public async updateUserRole(userId: number, roleId: number): Promise<void> {
    try {
      await prisma.users.update({
        where: {
          id: userId
        },
        data: {
          roleId: roleId
        }
      });
    } catch (error: unknown) {
      throw new Error(`Error updating user Role in repository: ${error}`);
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    try {
      await prisma.users.delete({
        where: {
          id: userId
        }
      });
    } catch (error: unknown) {
      throw new Error(`Error deleting user in repository: ${error}`);
    }
  }
}
