/*
  Warnings:

  - You are about to drop the column `type` on the `ParticipantCommitment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ParticipantCommitment" DROP COLUMN "type",
ADD COLUMN     "commitmentDonation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "commitmentVolunteer" BOOLEAN NOT NULL DEFAULT false;
