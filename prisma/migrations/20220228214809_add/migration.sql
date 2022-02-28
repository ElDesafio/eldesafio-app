/*
  Warnings:

  - You are about to drop the column `Observation` on the `ParticipantHealth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ParticipantHealth" DROP COLUMN "Observation",
ADD COLUMN     "observations" TEXT;
