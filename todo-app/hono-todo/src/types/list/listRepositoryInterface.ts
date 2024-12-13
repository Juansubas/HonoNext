import type { ListDto, CreateListDto, UpdateListDto } from "../../dtos/listDto";

export interface ListRepositoryInterface {
  createList(createListDto: CreateListDto): Promise<void>;
  updateList(listId: number, updateListDto: UpdateListDto): Promise<void>;
  getListsByBoard(boardId: number): Promise<ListDto[]>;
  getListById(listId: number): Promise<ListDto | null>;
  deleteList(listId: number): Promise<void>;
}