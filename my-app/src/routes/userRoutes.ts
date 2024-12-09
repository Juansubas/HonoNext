import { Hono } from 'hono'
import UserController from '../controllers/userController';
import UserService from '../service/userService';
import UserRepository from '../repositories/userRepository';
import type { Context } from 'hono';

const app = new Hono();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.get('/users', async (c : Context ) => {
  try {
    const users = await userController.getAllUsers();
    return c.json(users, 200);
  } catch (error) {
    return c.text('Error al obtener usuarios', 500);
  }
});

export default app;