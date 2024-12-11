import { Hono, type Context } from 'hono';
import { UserRepository } from '../repositories/userRepository.js';
import { UserService } from '../services/userService.js';
import { UserController } from '../controllers/userController.js';

const userRouter = new Hono();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


userRouter.get('/', async (c : Context) => userController.getUsers(c));

userRouter.post('/', async (c: Context) => userController.createUser(c));

export default userRouter;