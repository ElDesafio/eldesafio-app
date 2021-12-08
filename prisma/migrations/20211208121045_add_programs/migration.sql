-- CreateEnum
CREATE TYPE "ProgramSex" AS ENUM ('MALE', 'FEMALE', 'ALL');

-- CreateEnum
CREATE TYPE "Weekdays" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "seats" INTEGER NOT NULL,
    "ageFrom" INTEGER NOT NULL,
    "ageTo" INTEGER NOT NULL,
    "ageByYear" BOOLEAN NOT NULL DEFAULT false,
    "sex" "ProgramSex" NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnPrograms" (
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "isFacilitator" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnPrograms_pkey" PRIMARY KEY ("userId","programId")
);

-- CreateTable
CREATE TABLE "ParticipantsOnPrograms" (
    "programId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    CONSTRAINT "ParticipantsOnPrograms_pkey" PRIMARY KEY ("programId","participantId")
);

-- CreateTable
CREATE TABLE "ProgramDays" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "day" "Weekdays" NOT NULL,
    "fromTime" TEXT NOT NULL,
    "toTime" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    CONSTRAINT "ProgramDays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnPrograms" ADD CONSTRAINT "UsersOnPrograms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnPrograms" ADD CONSTRAINT "UsersOnPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnPrograms" ADD CONSTRAINT "ParticipantsOnPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnPrograms" ADD CONSTRAINT "ParticipantsOnPrograms_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnPrograms" ADD CONSTRAINT "ParticipantsOnPrograms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnPrograms" ADD CONSTRAINT "ParticipantsOnPrograms_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDays" ADD CONSTRAINT "ProgramDays_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDays" ADD CONSTRAINT "ProgramDays_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDays" ADD CONSTRAINT "ProgramDays_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
