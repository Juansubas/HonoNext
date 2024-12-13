import type { CardDto, CreateCardDto, UpdateCardDto } from "../../dtos/cardDto";

export interface CardServiceInterface {
  createCard(createCardDto: CreateCardDto): Promise<void>;
  updateCard(cardId: number, updateCardDto: UpdateCardDto): Promise<void>;
  getCardsByList(listId: number): Promise<CardDto[]>;
  getCardById(cardId: number): Promise<CardDto | null>;
  deleteCard(cardId: number): Promise<void>;
}

