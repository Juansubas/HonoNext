import type { BoardDto, CreateBoardDto, UpdateBoardDto } from "../../dtos/boardDto";

export interface BoardRepositoryInterface {

  createBoard(createBoardDto : CreateBoardDto, userId: number) : Promise<void>
  updateBoard(boardId: number, updateBoardDto : UpdateBoardDto): Promise<void>
  getBoardsByUser(userId: number): Promise<BoardDto[]>
  getBoardById(boardId: number): Promise<BoardDto | null>
  deleteBoard(boardId: number): Promise<void>
}