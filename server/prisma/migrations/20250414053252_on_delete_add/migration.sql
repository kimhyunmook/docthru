-- DropForeignKey
ALTER TABLE "challengework_feedback" DROP CONSTRAINT "challengework_feedback_challengeworkId_fkey";

-- AddForeignKey
ALTER TABLE "challengework_feedback" ADD CONSTRAINT "challengework_feedback_challengeworkId_fkey" FOREIGN KEY ("challengeworkId") REFERENCES "challengework"("id") ON DELETE CASCADE ON UPDATE CASCADE;
