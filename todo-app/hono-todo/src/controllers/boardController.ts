import type { Context } from "hono";
import type { BoardService } from "../services/boardService";
import type { CreateBoardDto } from "../dtos/boardDto";
import { HTTPException } from "hono/http-exception";

export class BoardController {
  constructor(private boardService: BoardService) { }

  public async createBoard(c: Context) {
    try {
      const { id } = await c.get('payload');
      const board = await c.req.json<CreateBoardDto>();
      await this.boardService.createBoard(board, Number(id))
      return c.json('Board Created', 201);
    } catch (error: unknown) {
      console.error('Error al crear el Board:', error);
      const message = 'No se pudo crear el Board debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getBoardsByUser(c: Context){
    try {
      const { id } = await c.get('payload');
      const boards = await this.boardService.getBoardsByUser(Number(id))

      if (!boards || boards.length === 0) {
        return c.json('Not Found Boards', 404);
      }

      return c.json(boards, 200);
    } catch (error: unknown) {
      console.error('Error al obtener los Boards:', error);
      const message = 'No se pudo obtener los Boards debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getBoardById(c: Context){
    try {
      const id = await c.req.param('id');
      const board = await this.boardService.getBoardById(Number(id))

      if (!board) {
        return c.json('Not Found Board', 404);
      }

      return c.json(board, 200);
    } catch (error: unknown) {
      console.error('Error al obtener el Board:', error);
      const message = 'No se pudo obtener el Board debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async deleteBoard(c: Context){
    try {
      const id = await c.req.param('id');
      await this.boardService.deleteBoard(Number(id))

      return c.json('Deleted Board', 200);
    } catch (error: unknown) {
      console.error('Error al eliminar el Board:', error);
      const message = 'No se pudo eliminar el Board debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async updateBoard(c: Context) {
    try {
      const id = await c.req.param('id');
      const board = await c.req.json<CreateBoardDto>();
      await this.boardService.updateBoard(Number(id) ,board);
      return c.json('Board Updated', 200);
    } catch (error: unknown) {
      console.error('Error al actualizar el Board:', error);
      const message = 'No se pudo actualizar el Board debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }
}