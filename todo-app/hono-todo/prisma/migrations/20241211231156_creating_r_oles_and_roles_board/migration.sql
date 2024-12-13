/*
  Warnings:

  - Added the required column `user_id` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BoardMembers" DROP CONSTRAINT "BoardMembers_role_id_fkey";

-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RolesBoard" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolesBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMembers" ADD CONSTRAINT "BoardMembers_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "RolesBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
