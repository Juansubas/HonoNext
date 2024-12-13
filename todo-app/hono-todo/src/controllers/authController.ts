import type { Context } from "hono";
import type { AuthService } from "../services/authService";
import type { loginDto } from "../dtos/loginDto";

export class AuthController {
  constructor(private authService : AuthService){}

  public async login(c: Context) {
    try {
      const data = await c.req.json<loginDto>();

      const token = await this.authService.login(data.email, data.password);

      return c.json(token, 200);
    } catch (error) {
      
    }
  }
}