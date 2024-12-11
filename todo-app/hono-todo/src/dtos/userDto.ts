export type createUserDto = {
  firstName : string,
  lastName: string,
  age: number,
  email: string,
  phone: string,
  birthDate: Date
}

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}