export type CreateBoardDto = {
  name: string;
  description: string;
}

export type BoardDto = {
  id: number;
  name: string;
  description: string;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateBoardDto = Partial<CreateBoardDto>;