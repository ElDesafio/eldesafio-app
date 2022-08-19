-- DropForeignKey
ALTER TABLE "ProgramDays" DROP CONSTRAINT "ProgramDays_programId_fkey";

-- AddForeignKey
ALTER TABLE "ProgramDays" ADD CONSTRAINT "ProgramDays_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
