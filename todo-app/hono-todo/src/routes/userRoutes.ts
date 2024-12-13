import { Hono, type Context } from 'hono';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService.js';
import { UserController } from '../controllers/userController';
import { zValidator } from '@hono/zod-validator'
import { CreateUserSchema, idSchema, UpdateUserSchema, UserRoleSchema } from '../schemas/userSchema'
import { verifyJwtToken, verifyRole } from '../middlewares/AuthMiddleware';

const userRouter = new Hono();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.use(verifyJwtToken);
userRouter.use(verifyRole);

userRouter.get('/', async (c : Context) => userController.getUsers(c));

userRouter.get('/:id',zValidator('param', idSchema), async (c : Context) => userController.getUserById(c));

userRouter.post('/', zValidator('json', CreateUserSchema) , async (c: Context) => userController.createUser(c));

userRouter.put('/:id', zValidator('param', idSchema), zValidator('json', UpdateUserSchema) , async (c: Context) => userController.updateUser(c));

userRouter.put('/role/:id', zValidator('param', idSchema), zValidator('json', UserRoleSchema) , async (c: Context) => userController.updateUserRole(c));

userRouter.delete('/:id',zValidator('param', idSchema), async (c: Context) => userController.deleteUser(c));

export default userRouter;