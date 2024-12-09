import bcrypt from 'bcrypt'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = async (password: string) : Promise<string> => {
  return bcrypt.hashSync(password, salt);
}

export default hash;