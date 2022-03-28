-- CreateEnum
CREATE TYPE "ParticipantCommitmentType" AS ENUM ('VOLUNTEER', 'DONATION');

-- CreateTable
CREATE TABLE "ParticipantCommitment" (
    "year" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "type" "ParticipantCommitmentType" NOT NULL,
    "aprilStatus" BOOLEAN NOT NULL DEFAULT false,
    "aprilDescription" TEXT,
    "mayStatus" BOOLEAN NOT NULL DEFAULT false,
    "mayDescription" TEXT,
    "juneStatus" BOOLEAN NOT NULL DEFAULT false,
    "juneDescription" TEXT,
    "julyStatus" BOOLEAN NOT NULL DEFAULT false,
    "julyDescription" TEXT,
    "augustStatus" BOOLEAN NOT NULL DEFAULT false,
    "augustDescription" TEXT,
    "septemberStatus" BOOLEAN NOT NULL DEFAULT false,
    "septemberDescription" TEXT,
    "octoberStatus" BOOLEAN NOT NULL DEFAULT false,
    "octoberDescription" TEXT,
    "novemberStatus" BOOLEAN NOT NULL DEFAULT false,
    "novemberDescription" TEXT,
    "decembreStatus" BOOLEAN NOT NULL DEFAULT false,
    "decembreDescription" TEXT,

    CONSTRAINT "ParticipantCommitment_pkey" PRIMARY KEY ("year","participantId")
);

-- AddForeignKey
ALTER TABLE "ParticipantCommitment" ADD CONSTRAINT "ParticipantCommitment_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
