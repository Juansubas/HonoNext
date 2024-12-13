import jwt from 'jsonwebtoken';

const secretKey: string = process.env.SECRET_KEY as string;

export function generateToken(payload: object): string {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): string | jwt.JwtPayload | null {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; 
  } catch (error) {
    return null; 
  }
}
