export type CreateCardDto = {
  listId: number;
  title: string;
  description: string;
  position: number;
  dueDate: Date;
};

export type CardDto = {
  id: number;
  listId: number;
  title: string;
  description: string;
  position: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateCardDto = Partial<CreateCardDto>;