-- CreateEnum
CREATE TYPE "ParticipantDiaryType" AS ENUM ('YEAR_STATUS_ACTIVE', 'YEAR_STATUS_WAITING', 'YEAR_STATUS_INACTIVE', 'PROGRAM_STATUS_ACTIVE', 'PROGRAM_STATUS_WAITING', 'PROGRAM_STATUS_INACTIVE_NO_SHOW', 'PROGRAM_STATUS_INACTIVE_LOW_ATTENDANCE', 'PROGRAM_STATUS_INACTIVE_FAMILY', 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'PROGRAM_STATUS_INACTIVE_OTHER', 'INFO', 'MENTORSHIP');

-- AlterTable
ALTER TABLE "ParticipantStatus" ALTER COLUMN "status" SET DEFAULT E'INACTIVE';

-- CreateTable
CREATE TABLE "ParticipantDiary" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "type" "ParticipantDiaryType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    CONSTRAINT "ParticipantDiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantDiaryPrograms" (
    "participantDiaryId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,

    CONSTRAINT "ParticipantDiaryPrograms_pkey" PRIMARY KEY ("participantDiaryId","programId")
);

-- AddForeignKey
ALTER TABLE "ParticipantDiary" ADD CONSTRAINT "ParticipantDiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDiary" ADD CONSTRAINT "ParticipantDiary_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDiary" ADD CONSTRAINT "ParticipantDiary_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDiaryPrograms" ADD CONSTRAINT "ParticipantDiaryPrograms_participantDiaryId_fkey" FOREIGN KEY ("participantDiaryId") REFERENCES "ParticipantDiary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDiaryPrograms" ADD CONSTRAINT "ParticipantDiaryPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
