/*
  Warnings:

  - Added the required column `sex` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "sex" "Sex" NOT NULL;
