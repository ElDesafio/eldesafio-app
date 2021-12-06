/*
  Warnings:

  - Added the required column `createdBy` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "dni" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "healthCertificateDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "medicalInsurance" TEXT,
ADD COLUMN     "neigborhood" TEXT,
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "presentedDNI" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "presentedHealthCertificate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "surveyBiographyId" INTEGER,
ADD COLUMN     "updatedBy" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SurveyBiography" (
    "id" SERIAL NOT NULL,
    "livesWith" TEXT NOT NULL,
    "changedSchool" BOOLEAN NOT NULL DEFAULT false,
    "repeatedYear" BOOLEAN NOT NULL DEFAULT false,
    "schoolSituation" TEXT NOT NULL,
    "programsInterest" TEXT NOT NULL,
    "participatedBefore" BOOLEAN NOT NULL DEFAULT false,
    "otherActivities" BOOLEAN NOT NULL DEFAULT false,
    "personalDescription" TEXT NOT NULL,
    "homeActivities" TEXT NOT NULL,

    CONSTRAINT "SurveyBiography_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_surveyBiographyId_fkey" FOREIGN KEY ("surveyBiographyId") REFERENCES "SurveyBiography"("id") ON DELETE SET NULL ON UPDATE CASCADE;
