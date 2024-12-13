import type { CardDto, CreateCardDto, UpdateCardDto } from "../dtos/cardDto";
import type { CardRepository } from "../repositories/cardRepository";
import type { CardServiceInterface } from "../types/card/cardServiceInterface";

export class CardService implements CardServiceInterface {
  constructor(private cardRepository: CardRepository) {}

  public async createCard(createCardDto: CreateCardDto): Promise<void> {
    try {
      await this.cardRepository.createCard(createCardDto);
    } catch (error: unknown) {
      throw new Error(`Error Creating Card from service: ${error}`);
    }
  }

  public async updateCard(cardId: number, updateCardDto: UpdateCardDto): Promise<void> {
    try {
      await this.cardRepository.updateCard(cardId, updateCardDto);
    } catch (error: unknown) {
      throw new Error(`Error updating Card from service: ${error}`);
    }
  }

  public async getCardsByList(listId: number): Promise<CardDto[]> {
    try {
      return await this.cardRepository.getCardsByList(listId);
    } catch (error: unknown) {
      throw new Error(`Error fetching Cards by List from service: ${error}`);
    }
  }

  public async getCardById(cardId: number): Promise<CardDto | null> {
    try {
      return await this.cardRepository.getCardById(cardId);
    } catch (error: unknown) {
      throw new Error(`Error fetching Card by Id from service: ${error}`);
    }
  }

  public async deleteCard(cardId: number): Promise<void> {
    try {
      await this.cardRepository.deleteCard(cardId);
    } catch (error: unknown) {
      throw new Error(`Error deleting Card from service: ${error}`);
    }
  }
}
