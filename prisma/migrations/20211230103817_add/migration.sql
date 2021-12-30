/*
  Warnings:

  - Made the column `notSchooled` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "notSchooled" SET NOT NULL;
