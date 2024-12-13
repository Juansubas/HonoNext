// listController.ts
import type { Context } from "hono";
import type { ListService } from "../services/listService";
import type { CreateListDto } from "../dtos/listDto";
import { HTTPException } from "hono/http-exception";

export class ListController {
  constructor(private listService: ListService) {}

  public async createList(c: Context) {
    try {
      const list = await c.req.json<CreateListDto>();
      await this.listService.createList(list);
      return c.json('List Created', 201);
    } catch (error: unknown) {
      console.error('Error creating the List:', error);
      const message = 'Unable to create the List due to an internal error.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getListsByBoard(c: Context) {
    try {
      const boardId = await c.req.param('boardId');
      const lists = await this.listService.getListsByBoard(Number(boardId));

      if (!lists || lists.length === 0) {
        return c.json('Not Found Lists', 404);
      }

      return c.json(lists, 200);
    } catch (error: unknown) {
      console.error('Error fetching the Lists:', error);
      const message = 'Unable to fetch the Lists due to an internal error.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getListById(c: Context) {
    try {
      const id = await c.req.param('id');
      const list = await this.listService.getListById(Number(id));

      if (!list) {
        return c.json('Not Found List', 404);
      }

      return c.json(list, 200);
    } catch (error: unknown) {
      console.error('Error fetching the List:', error);
      const message = 'Unable to fetch the List due to an internal error.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async deleteList(c: Context) {
    try {
      const id = await c.req.param('id');
      await this.listService.deleteList(Number(id));

      return c.json('Deleted List', 200);
    } catch (error: unknown) {
      console.error('Error deleting the List:', error);
      const message = 'Unable to delete the List due to an internal error.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async updateList(c: Context) {
    try {
      const id = await c.req.param('id');
      const list = await c.req.json<CreateListDto>();
      await this.listService.updateList(Number(id), list);
      return c.json('List Updated', 200);
    } catch (error: unknown) {
      console.error('Error updating the List:', error);
      const message = 'Unable to update the List due to an internal error.';
      throw new HTTPException(500, { message, cause: error });
    }
  }
}
