import type { User } from "@prisma/client";
import { prisma } from "../utils/prisma";

class UserRepository {
  public async getAllUsers(): Promise<User[]> {
    try {
      return await prisma.user.findMany();
    } catch (error: unknown) {
      throw new Error(`Error al obtener los usuarios: ${error}`)
    }
  }
}

export default UserRepository;