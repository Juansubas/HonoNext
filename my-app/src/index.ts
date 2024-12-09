import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRouter from '../src/routes/userRoutes';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Welcome App Hono')
});

app.route('/', userRouter);


const port = 3001
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
