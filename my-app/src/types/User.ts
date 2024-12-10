export type UserCreate = {
  firstName: string,
  lastName : string,
  userName : string,
  email : string,
  password : string,
}

export type UserUpdate =  Partial<UserCreate>;