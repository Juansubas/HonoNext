import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRouter from '../src/routes/userRoutes';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/users', userRouter);

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

