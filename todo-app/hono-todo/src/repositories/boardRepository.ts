import type { BoardDto, CreateBoardDto, UpdateBoardDto } from "../dtos/boardDto.js";
import type { BoardRepositoryInterface } from "../types/board/boardRepositoryInterface.js";
import { prisma } from "../utils/prisma.js";

export class BoardRepository implements BoardRepositoryInterface {

  public async createBoard(createBoardDto : CreateBoardDto, userId: number) : Promise<void>{
    try {
      await prisma.boards.create({
        data:{
          name: createBoardDto.name,
          description: createBoardDto.description,
          createdBy: userId
        }
      })
    } catch (error: unknown) {
      throw new Error(`Error creating Board from repository: ${error}`);
    }
  }

  public async updateBoard(boardId: number, updateBoardDto : UpdateBoardDto): Promise<void>{
    try {
      await prisma.boards.update({
        where: {
          id: boardId
        },
        data:{
          name: updateBoardDto.name,
          description: updateBoardDto.description,
        }
      })
    } catch (error: unknown) {
      throw new Error(`Error updating Board from repository: ${error}`);
    }
  }

  public async getBoardsByUser(userId: number): Promise<BoardDto[]>{
    try {
      return await prisma.boards.findMany({
        where:{
          createdBy: userId
        }
      })
    } catch (error: unknown) {
      throw new Error(`Error fetching Boards By User from repository: ${error}`);
    }
  }

  public async getBoardById(boardId: number): Promise<BoardDto | null>{
    try {
      return await prisma.boards.findUnique({
        where:{
          id: boardId
        }
      })
    } catch (error: unknown) {
      throw new Error(`Error fetching Board By ID from repository: ${error}`);
    }
  }

  public async deleteBoard(boardId: number): Promise<void>{
    try {
      await prisma.boards.delete({
        where:{
          id: boardId
        }
      })
    } catch (error: unknown) {
      throw new Error(`Error deleting Board By ID from repository: ${error}`);
    }
  }
}