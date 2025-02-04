/*
  Warnings:

  - You are about to drop the column `userId` on the `challenge` table. All the data in the column will be lost.
  - Added the required column `onerId` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "challenge" DROP CONSTRAINT "challenge_userId_fkey";

-- AlterTable
ALTER TABLE "challenge" DROP COLUMN "userId",
ADD COLUMN     "onerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_onerId_fkey" FOREIGN KEY ("onerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
