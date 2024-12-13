export type createRoleDto = {
  name: string;
  description: string;
}

export type roleDto = {
  id: Number;
  createdAt: Date;
  updatedAt: Date;
} & createRoleDto;

export type updateRoleDto = Partial<createRoleDto>;