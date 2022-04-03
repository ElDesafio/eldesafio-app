-- CreateEnum
CREATE TYPE "UserDiaryType" AS ENUM ('STATUS_ACTIVE', 'STATUS_INACTIVE', 'PROGRAM_STATUS_ACTIVE', 'PROGRAM_STATUS_INACTIVE', 'INFO');

-- CreateTable
CREATE TABLE "UserDiary" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "UserDiaryType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isAutoEvent" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    CONSTRAINT "UserDiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDiaryPrograms" (
    "userDiaryId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,

    CONSTRAINT "UserDiaryPrograms_pkey" PRIMARY KEY ("userDiaryId","programId")
);

-- AddForeignKey
ALTER TABLE "UserDiary" ADD CONSTRAINT "UserDiary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiary" ADD CONSTRAINT "UserDiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiary" ADD CONSTRAINT "UserDiary_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiaryPrograms" ADD CONSTRAINT "UserDiaryPrograms_userDiaryId_fkey" FOREIGN KEY ("userDiaryId") REFERENCES "UserDiary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiaryPrograms" ADD CONSTRAINT "UserDiaryPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
