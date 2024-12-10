import { Hono } from 'hono';
import UserController from '../controllers/userController';
import UserService from '../service/userService';
import UserRepository from '../repositories/userRepository';
import type { Context } from 'hono';

const app = new Hono();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.get('/users', async (c: Context) => userController.getAllUserResponse(c));

app.get('/users/:id', async (c: Context) => userController.getUserResponseById(c.req.param('id'), c));

app.post('/users', async (c: Context) => userController.createUserResponse(c));

export default app;
