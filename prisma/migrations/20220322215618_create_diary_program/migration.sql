-- CreateEnum
CREATE TYPE "ProgramDiaryType" AS ENUM ('INFO');

-- CreateTable
CREATE TABLE "ProgramDiary" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "type" "ProgramDiaryType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isAutoEvent" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    CONSTRAINT "ProgramDiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramDiaryParticipants" (
    "programDiaryId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "ProgramDiaryParticipants_pkey" PRIMARY KEY ("programDiaryId","participantId")
);

-- AddForeignKey
ALTER TABLE "ProgramDiary" ADD CONSTRAINT "ProgramDiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDiary" ADD CONSTRAINT "ProgramDiary_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDiary" ADD CONSTRAINT "ProgramDiary_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDiaryParticipants" ADD CONSTRAINT "ProgramDiaryParticipants_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDiaryParticipants" ADD CONSTRAINT "ProgramDiaryParticipants_programDiaryId_fkey" FOREIGN KEY ("programDiaryId") REFERENCES "ProgramDiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
