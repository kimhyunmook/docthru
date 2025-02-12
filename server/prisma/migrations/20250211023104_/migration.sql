/*
  Warnings:

  - Added the required column `title` to the `challengework` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "challengework" ADD COLUMN     "title" TEXT NOT NULL;
