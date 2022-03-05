/*
  Warnings:

  - You are about to drop the column `surveyBiographyId` on the `Participant` table. All the data in the column will be lost.
  - The primary key for the `SurveyBiography` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SurveyBiography` table. All the data in the column will be lost.
  - Added the required column `participantId` to the `SurveyBiography` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_surveyBiographyId_fkey";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "surveyBiographyId";

-- AlterTable
ALTER TABLE "SurveyBiography" DROP CONSTRAINT "SurveyBiography_pkey",
DROP COLUMN "id",
ADD COLUMN     "participantId" INTEGER NOT NULL,
ADD CONSTRAINT "SurveyBiography_pkey" PRIMARY KEY ("participantId");

-- AddForeignKey
ALTER TABLE "SurveyBiography" ADD CONSTRAINT "SurveyBiography_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
