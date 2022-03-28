/*
  Warnings:

  - You are about to drop the column `decembreDescription` on the `ParticipantCommitment` table. All the data in the column will be lost.
  - You are about to drop the column `decembreStatus` on the `ParticipantCommitment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ParticipantCommitment" DROP COLUMN "decembreDescription",
DROP COLUMN "decembreStatus",
ADD COLUMN     "decemberDescription" TEXT,
ADD COLUMN     "decemberStatus" BOOLEAN;
