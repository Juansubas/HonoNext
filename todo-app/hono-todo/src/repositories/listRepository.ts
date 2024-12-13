// listRepository.ts
import type { ListDto, CreateListDto, UpdateListDto } from "../dtos/listDto";
import type { ListRepositoryInterface } from "../types/list/listRepositoryInterface";
import { prisma } from "../utils/prisma";

export class ListRepository implements ListRepositoryInterface {
  public async createList(createListDto: CreateListDto): Promise<void> {
    try {
      await prisma.lists.create({
        data: {
          boardId: createListDto.boardId,
          name: createListDto.name,
          position: createListDto.position,
        },
      });
    } catch (error: unknown) {
      throw new Error(`Error creating List from repository: ${error}`);
    }
  }

  public async updateList(listId: number, updateListDto: UpdateListDto): Promise<void> {
    try {
      await prisma.lists.update({
        where: {
          id: listId,
        },
        data: {
          name: updateListDto.name,
          position: updateListDto.position,
        },
      });
    } catch (error: unknown) {
      throw new Error(`Error updating List from repository: ${error}`);
    }
  }

  public async getListsByBoard(boardId: number): Promise<ListDto[]> {
    try {
      return await prisma.lists.findMany({
        where: {
          boardId: boardId,
        },
      });
    } catch (error: unknown) {
      throw new Error(`Error fetching Lists by Board from repository: ${error}`);
    }
  }

  public async getListById(listId: number): Promise<ListDto | null> {
    try {
      return await prisma.lists.findUnique({
        where: {
          id: listId,
        },
      });
    } catch (error: unknown) {
      throw new Error(`Error fetching List by Id from repository: ${error}`);
    }
  }

  public async deleteList(listId: number): Promise<void> {
    try {
      await prisma.lists.delete({
        where: {
          id: listId,
        },
      });
    } catch (error: unknown) {
      throw new Error(`Error deleting List from repository: ${error}`);
    }
  }
}
