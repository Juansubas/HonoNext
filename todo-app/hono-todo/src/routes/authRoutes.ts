import { Hono, type Context } from "hono";
import { AuthService } from "../services/authService";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { AuthController } from "../controllers/authController";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas/loginSchema";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);
const authRoutes = new Hono();

authRoutes.post('/login', zValidator('json', loginSchema), async (c: Context) => authController.login(c) )

export default authRoutes;