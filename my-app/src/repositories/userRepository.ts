import type { User } from "@prisma/client";
import { prisma } from "../utils/prisma";
import type { UserCreate } from "../types/User";

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
}

export default UserRepository;