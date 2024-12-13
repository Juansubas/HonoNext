import type { responseDto } from "../../dtos/responseDto";

export  interface AuthServiceInterface{
  login(email: string, password: string) : Promise<responseDto>
}