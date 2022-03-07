-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('INVITED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ParticipantYearStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'WAITING');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT E'INVITED';

-- CreateTable
CREATE TABLE "ParticipantStatus" (
    "year" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "status" "ParticipantYearStatus" NOT NULL,

    CONSTRAINT "ParticipantStatus_pkey" PRIMARY KEY ("year","participantId")
);

-- AddForeignKey
ALTER TABLE "ParticipantStatus" ADD CONSTRAINT "ParticipantStatus_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
