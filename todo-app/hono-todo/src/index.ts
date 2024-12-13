import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRouter from '../src/routes/userRoutes';
import authRoutes from './routes/authRoutes';
import roleRoutes from './routes/roleRoutes';
import boardRoutes from './routes/boardRoutes';
import listRoutes from './routes/listRoutes';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/users', userRouter);
app.route('/auth', authRoutes);
app.route('/roles', roleRoutes);
app.route('/boards', boardRoutes);
app.route('/lists', listRoutes);

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

