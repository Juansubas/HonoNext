// listService.ts
import type { CreateListDto, UpdateListDto, ListDto } from "../dtos/listDto";
import type { ListRepository } from "../repositories/listRepository";
import type { ListServiceInterface } from "../types/list/ListServiceInterface";

export class ListService implements ListServiceInterface {
  constructor(private listRepository: ListRepository) {}

  public async createList(createListDto: CreateListDto): Promise<void> {
    try {
      await this.listRepository.createList(createListDto);
    } catch (error: unknown) {
      throw new Error(`Error Creating List from service: ${error}`);
    }
  }

  public async updateList(listId: number, updateListDto: UpdateListDto): Promise<void> {
    try {
      await this.listRepository.updateList(listId, updateListDto);
    } catch (error: unknown) {
      throw new Error(`Error updating List from service: ${error}`);
    }
  }

  public async getListsByBoard(boardId: number): Promise<ListDto[]> {
    try {
      return await this.listRepository.getListsByBoard(boardId);
    } catch (error: unknown) {
      throw new Error(`Error fetching Lists by Board from service: ${error}`);
    }
  }

  public async getListById(listId: number): Promise<ListDto | null> {
    try {
      return await this.listRepository.getListById(listId);
    } catch (error: unknown) {
      throw new Error(`Error fetching List by Id from service: ${error}`);
    }
  }

  public async deleteList(listId: number): Promise<void> {
    try {
      await this.listRepository.deleteList(listId);
    } catch (error: unknown) {
      throw new Error(`Error deleting List from service: ${error}`);
    }
  }
}
