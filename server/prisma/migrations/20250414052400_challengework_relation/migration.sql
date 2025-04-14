/*
  Warnings:

  - Added the required column `challengeworkId` to the `challengework_feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "challengework_feedback" ADD COLUMN     "challengeworkId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "challengework_feedback" ADD CONSTRAINT "challengework_feedback_challengeworkId_fkey" FOREIGN KEY ("challengeworkId") REFERENCES "challengework"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
