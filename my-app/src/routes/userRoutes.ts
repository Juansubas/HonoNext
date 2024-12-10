import { Hono } from 'hono';
import UserController from '../controllers/userController';
import UserService from '../service/userService';
import UserRepository from '../repositories/userRepository';
import type { Context } from 'hono';

const app = new Hono();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.get('/users', async (c: Context) => userController.getAllUsers(c));

app.get('/users/:id', async (c: Context) => userController.getUserById( c));

app.delete('/users/:id', async( c: Context) => userController.deleteUser(c));

app.put('/users/:id', async( c: Context) => userController.updateUser(c));

app.post('/users', async (c: Context) => userController.createUser(c));

export default app;
