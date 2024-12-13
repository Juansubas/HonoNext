/*
  Warnings:

  - You are about to drop the column `user_id` on the `Roles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_user_id_fkey";

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
