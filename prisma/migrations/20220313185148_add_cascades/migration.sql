-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_programId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantsOnClasses" DROP CONSTRAINT "ParticipantsOnClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantsOnClasses" DROP CONSTRAINT "ParticipantsOnClasses_participantId_fkey";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnClasses" ADD CONSTRAINT "ParticipantsOnClasses_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnClasses" ADD CONSTRAINT "ParticipantsOnClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
