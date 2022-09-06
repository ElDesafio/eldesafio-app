-- DropForeignKey
ALTER TABLE "ParticipantStatus" DROP CONSTRAINT "ParticipantStatus_participantId_fkey";

-- AddForeignKey
ALTER TABLE "ParticipantStatus" ADD CONSTRAINT "ParticipantStatus_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
