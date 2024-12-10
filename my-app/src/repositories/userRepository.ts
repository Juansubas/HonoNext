import type { User } from "@prisma/client";
import { prisma } from "../utils/prisma";
import type { UserCreate, UserUpdate } from "../types/User";

class UserRepository {
  public async getAllUsers(): Promise<User[]> {
    try {
      return await prisma.user.findMany();
    } catch (error: unknown) {
      throw new Error(`Error al obtener los usuarios: ${error}`)
    }
  }

  public async createUser(User: UserCreate) : Promise<void> {
    try{
      await prisma.user.create({
        data: {
          firtsName: User.firstName,
          lastName: User.lastName,
          username : User.userName,
          email: User.email,
          password: User.password
        }
      })
    }catch(e) {
      console.error('Error en el repository');
      throw new Error(`Error al crear el usuario en repository ${e}`)
    }
  }

  public async getUserById(userId: number) : Promise<User | null> {
    try {
      const user : User | null = await prisma.user.findUnique(
        {
          where: {
            id: userId
          }
        }
      )

      return user;
    } catch (error) {
      console.error('Error en el repository');
      throw new Error(`Error al obtener el usuario por id, ${error}`);
    }
  }

  public async deleteUser(userId: number) : Promise<void> {
    try {
      const user : User | null = await prisma.user.delete(
        {
          where: {
            id: userId
          }
        }
      )

    } catch (error) {
      console.error('Error en el repository');
      throw new Error(`Error al eliminar usuario por id, ${error}`);
    }
  }

  public async updateUser(userId: number, user: UserUpdate) {
    try {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          firtsName: user.firstName,
          lastName: user.lastName,
          username : user.userName,
          email: user.email,
          password: user.password
        }
      })
    } catch (error) {
      console.error('Error en el repository');
      throw new Error(`Error al actualizar usuario, ${error}`);
    }
  }
}

export default UserRepository;