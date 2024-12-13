import { PrismaClient } from "@prisma/client";
import type { CardDto, CreateCardDto, UpdateCardDto } from "../dtos/cardDto";
import type { CardRepositoryInterface } from "../types/card/cardRepositoryInterface";

const prisma = new PrismaClient();

export class CardRepository implements CardRepositoryInterface {
  async createCard(createCardDto: CreateCardDto): Promise<void> {
    try {
      await prisma.cards.create({
        data: {
          listId: createCardDto.listId,
          title: createCardDto.title,
          description: createCardDto.description,
          position: createCardDto.position,
          dueDate: createCardDto.dueDate,
        },
      });
    } catch (error) {
      throw new Error(`Error creating card: ${error}`);
    }
  }

  async updateCard(cardId: number, updateCardDto: UpdateCardDto): Promise<void> {
    try {
      await prisma.cards.update({
        where: { id: cardId },
        data: {
          title: updateCardDto.title,
          description: updateCardDto.description,
          position: updateCardDto.position,
          dueDate: updateCardDto.dueDate,
        },
      });
    } catch (error) {
      throw new Error(`Error updating card: ${error}`);
    }
  }

  async getCardsByList(listId: number): Promise<CardDto[]> {
    try {
      return await prisma.cards.findMany({ where: { listId } });
    } catch (error) {
      throw new Error(`Error fetching cards by list: ${error}`);
    }
  }

  async getCardById(cardId: number): Promise<CardDto | null> {
    try {
      return await prisma.cards.findUnique({ where: { id: cardId } });
    } catch (error) {
      throw new Error(`Error fetching card by id: ${error}`);
    }
  }

  async deleteCard(cardId: number): Promise<void> {
    try {
      await prisma.cards.delete({ where: { id: cardId } });
    } catch (error) {
      throw new Error(`Error deleting card: ${error}`);
    }
  }
}
