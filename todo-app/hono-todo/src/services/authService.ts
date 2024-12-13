import type { responseDto } from "../dtos/responseDto";
import type { AuthServiceInterface } from "../types/auth/authServiceInterface";
import { checkUser } from "./bcrypt";
import { generateToken } from "./jsonWebToken";
import type { UserService } from "./userService";

export class AuthService implements AuthServiceInterface {

  constructor(private userService: UserService){}

  public async login(email: string, password: string) : Promise<responseDto> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if(!user) {
        return {
          result: null,
          message: 'User no encontrado'
        };
      }
  
      const result = await checkUser(password, user.password);
  
      if(!result) {
        return {
          result: null,
          message: 'Password no valida`'
        };
      }
      
      const token = await generateToken({
        id: user.id
      })
  
      return {
        result: token,
        message: 'Token generado`'
      };
    } catch (error: unknown) {
      throw new Error(`Failed to login in service: ${error}`);
    }
  }
}