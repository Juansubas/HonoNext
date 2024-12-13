import bcrypt from 'bcrypt';

// Encriptar contraseña
export async function encryptPassword(password : string) : Promise<string> {
  const saltRounds = 10; 
  const hash = await bcrypt.hash(password, saltRounds); 
  return hash;
}

// Comparar contraseña ingresada con el hash almacenado
export async function checkUser(password : string, hashedPassword : string) : Promise<boolean> {
  const match = await bcrypt.compare(password, hashedPassword); 
  return match;
}