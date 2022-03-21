-- DropForeignKey
ALTER TABLE "ParticipantDiary" DROP CONSTRAINT "ParticipantDiary_participantId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantDiaryPrograms" DROP CONSTRAINT "ParticipantDiaryPrograms_participantDiaryId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantDiaryPrograms" DROP CONSTRAINT "ParticipantDiaryPrograms_programId_fkey";

-- AddForeignKey
ALTER TABLE "ParticipantDiary" ADD CONSTRAINT "ParticipantDiary_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDiaryPrograms" ADD CONSTRAINT "ParticipantDiaryPrograms_participantDiaryId_fkey" FOREIGN KEY ("participantDiaryId") REFERENCES "ParticipantDiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDiaryPrograms" ADD CONSTRAINT "ParticipantDiaryPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
