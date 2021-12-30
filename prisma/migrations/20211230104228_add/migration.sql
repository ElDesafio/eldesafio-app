-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "schoolId" INTEGER;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
