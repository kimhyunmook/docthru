-- DropForeignKey
ALTER TABLE "alarm" DROP CONSTRAINT "alarm_userId_fkey";

-- DropForeignKey
ALTER TABLE "challenge" DROP CONSTRAINT "challenge_onerId_fkey";

-- DropForeignKey
ALTER TABLE "challengework" DROP CONSTRAINT "challengework_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "challengework" DROP CONSTRAINT "challengework_userId_fkey";

-- DropForeignKey
ALTER TABLE "challengework_feedback" DROP CONSTRAINT "challengework_feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "participant" DROP CONSTRAINT "participant_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "participant" DROP CONSTRAINT "participant_userId_fkey";

-- AddForeignKey
ALTER TABLE "alarm" ADD CONSTRAINT "alarm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_onerId_fkey" FOREIGN KEY ("onerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challengework" ADD CONSTRAINT "challengework_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challengework" ADD CONSTRAINT "challengework_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challengework_feedback" ADD CONSTRAINT "challengework_feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
