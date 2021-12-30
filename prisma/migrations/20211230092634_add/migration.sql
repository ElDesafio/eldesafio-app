-- CreateEnum
CREATE TYPE "SchoolYear" AS ENUM ('GRADE_1', 'GRADE_2', 'GRADE_3', 'GRADE_4', 'GRADE_5', 'GRADE_6', 'GRADE_7', 'YEAR_1', 'YEAR_2', 'YEAR_3', 'YEAR_4', 'YEAR_5');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "notSchooled" BOOLEAN DEFAULT false,
ADD COLUMN     "schoolYear" "SchoolYear";
