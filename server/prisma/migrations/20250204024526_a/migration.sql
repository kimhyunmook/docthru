/*
  Warnings:

  - You are about to drop the `_participantTouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_participantTouser" DROP CONSTRAINT "_participantTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_participantTouser" DROP CONSTRAINT "_participantTouser_B_fkey";

-- AlterTable
ALTER TABLE "challenge" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "documentType" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "originalLink" SET DEFAULT '',
ALTER COLUMN "field" SET DEFAULT '';

-- AlterTable
ALTER TABLE "participant" ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'pending',
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_participantTouser";

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
