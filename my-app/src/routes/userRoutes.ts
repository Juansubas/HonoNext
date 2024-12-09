import { Hono } from 'hono'
import UserController from '../controllers/userController';
import UserService from '../service/userService';
import UserRepository from '../repositories/userRepository';
import type { Context } from 'hono';
import type { UserCreate } from '../types/User';

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

app.post('/users', async (c: Context) => {
  try {
    const body = await c.req.json<UserCreate>();

    console.log('prueba dos ',body)
    await userController.createUser(body);
    return c.text('Usuario creado exitosamente', 201);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return c.text('No se pudo crear el usuario', 500);
  }
});


export default app;