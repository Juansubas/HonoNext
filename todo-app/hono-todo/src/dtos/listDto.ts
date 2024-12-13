export type CreateListDto = {
  boardId: number;
  name: string;
  position: number;
};

export type ListDto = {
  id: number;
  boardId: number;
  name: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateListDto = Partial<CreateListDto>;