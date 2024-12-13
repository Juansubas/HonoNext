import type { CreateBoardDto, UpdateBoardDto, BoardDto } from "../dtos/boardDto";
import type { BoardRepository } from "../repositories/boardRepository";
import type { BoardServiceInterface } from "../types/board/boardServiceInterface";

export class BoardService implements BoardServiceInterface{

  constructor(private boardRepository : BoardRepository){}

  public async createBoard(createBoardDto: CreateBoardDto, userId: number): Promise<void> {
    try {
      await this.boardRepository.createBoard(createBoardDto, userId);
    } catch (error: unknown) {
      throw new Error(`Error Creating Board from service: ${error}`);
    }
  }

  public async updateBoard(boardId: number, updateBoardDto: UpdateBoardDto): Promise<void> {
    try {
      await this.boardRepository.updateBoard(boardId, updateBoardDto);
    } catch (error: unknown) {
      throw new Error(`Error updating Board from service: ${error}`);
    }
  }

  public async getBoardsByUser(userId: number): Promise<BoardDto[]> {
    try {
      return await this.boardRepository.getBoardsByUser(userId);
    } catch (error: unknown) {
      throw new Error(`Error fetching Boards by User from service: ${error}`);
    }
  }

  public async getBoardById(boardId: number): Promise<BoardDto | null> {
    try {
      return await this.boardRepository.getBoardById(boardId);
    } catch (error: unknown) {
      throw new Error(`Error fetching Board by Id from service: ${error}`);
    }
  }

  public async deleteBoard(boardId: number): Promise<void> {
    try {
      await this.boardRepository.deleteBoard(boardId);
    } catch (error: unknown) {
      throw new Error(`Error deleting Board from service: ${error}`);
    }
  }

}