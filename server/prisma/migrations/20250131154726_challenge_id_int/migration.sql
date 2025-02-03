/*
  Warnings:

  - The primary key for the `challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "challenge" DROP CONSTRAINT "challenge_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "challenge_pkey" PRIMARY KEY ("id");
