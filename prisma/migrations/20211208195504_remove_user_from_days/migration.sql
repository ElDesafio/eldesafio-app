/*
  Warnings:

  - You are about to drop the column `createdBy` on the `ProgramDays` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `ProgramDays` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProgramDays" DROP CONSTRAINT "ProgramDays_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "ProgramDays" DROP CONSTRAINT "ProgramDays_updatedBy_fkey";

-- AlterTable
ALTER TABLE "ProgramDays" DROP COLUMN "createdBy",
DROP COLUMN "updatedBy";
