/*
  Warnings:

  - You are about to drop the column `nickName` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nickname` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_nickName_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "nickName",
ADD COLUMN     "nickname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");
