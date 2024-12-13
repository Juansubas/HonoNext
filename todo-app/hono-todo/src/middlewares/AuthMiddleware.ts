import { Hono, type Context } from 'hono';
import { verifyToken } from '../services/jsonWebToken';

export async function verifyJwtToken(c: Context, next: () => Promise<void>) {
  const token = c.req.header('Authorization')?.split(' ')[1]; // Obtener el token del header

  if (!token) {
    return c.text('Token not provided', 401); // Sin token, error 401
  }

  try {
    const decoded = verifyToken(token);
    c.set('decoded', decoded); // Pasar los datos decodificados al estado del contexto
    await next(); // Llama a la siguiente función middleware o al controlador
  } catch (error) {
    return c.text('Invalid token', 401); // Token inválido, error 401
  }
}

export async function verifyRole(c: Context, next: () => Promise<void>) {
  try {
    const decoded = c.get('decoded');
    if (!decoded || decoded.roleId === undefined) {
      return c.text('Invalid or missing token payload', 401);
    }
    
    if (decoded.roleId === 1) {
      return c.text('Access denied for this role', 403); // 403: Forbidden
    }
    await next(); // Llama a la siguiente función middleware o al controlador
  } catch (error) {
    return c.text('Invalid token', 401); // Token inválido, error 401
  }
}