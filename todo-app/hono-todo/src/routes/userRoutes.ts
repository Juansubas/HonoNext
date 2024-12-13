import { Hono, type Context } from 'hono';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService.js';
import { UserController } from '../controllers/userController';
import { zValidator } from '@hono/zod-validator'
import { CreateUserSchema, idSchema, UpdateUserSchema } from '../schemas/userSchema'

const userRouter = new Hono();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


userRouter.get('/', async (c : Context) => userController.getUsers(c));

userRouter.get('/:id',zValidator('param', idSchema), async (c : Context) => userController.getUserById(c));

userRouter.post('/', zValidator('json', CreateUserSchema) , async (c: Context) => userController.createUser(c));

userRouter.put('/:id', zValidator('param', idSchema), zValidator('json', UpdateUserSchema) , async (c: Context) => userController.updateUser(c));

userRouter.delete('/:id',zValidator('param', idSchema), async (c: Context) => userController.deleteUser(c));

export default userRouter;