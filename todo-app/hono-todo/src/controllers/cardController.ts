import type { Context } from "hono";
import type { CreateCardDto, UpdateCardDto } from "../dtos/cardDto";
import { HTTPException } from "hono/http-exception";
import type { CardService } from "../services/cardService";

export class CardController {
  constructor(private cardService: CardService) { }

  public async createCard(c: Context) {
    try {
      const card = await c.req.json<CreateCardDto>();
      await this.cardService.createCard(card);
      return c.json('Card Created', 201);
    } catch (error: unknown) {
      console.error('Error al crear la Card:', error);
      const message = 'No se pudo crear la Card debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getCardsByList(c: Context) {
    try {
      const listId = await c.req.param('listId');
      const cards = await this.cardService.getCardsByList(Number(listId));

      if (!cards || cards.length === 0) {
        return c.json('Not Found Cards', 404);
      }

      return c.json(cards, 200);
    } catch (error: unknown) {
      console.error('Error al obtener las Cards:', error);
      const message = 'No se pudieron obtener las Cards debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async getCardById(c: Context) {
    try {
      const id = await c.req.param('id');
      const card = await this.cardService.getCardById(Number(id));

      if (!card) {
        return c.json('Not Found Card', 404);
      }

      return c.json(card, 200);
    } catch (error: unknown) {
      console.error('Error al obtener la Card:', error);
      const message = 'No se pudo obtener la Card debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async deleteCard(c: Context) {
    try {
      const id = await c.req.param('id');
      await this.cardService.deleteCard(Number(id));
      return c.json('Deleted Card', 200);
    } catch (error: unknown) {
      console.error('Error al eliminar la Card:', error);
      const message = 'No se pudo eliminar la Card debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }

  public async updateCard(c: Context) {
    try {
      const id = await c.req.param('id');
      const card = await c.req.json<UpdateCardDto>();
      await this.cardService.updateCard(Number(id), card);
      return c.json('Card Updated', 200);
    } catch (error: unknown) {
      console.error('Error al actualizar la Card:', error);
      const message = 'No se pudo actualizar la Card debido a un error interno.';
      throw new HTTPException(500, { message, cause: error });
    }
  }
}
