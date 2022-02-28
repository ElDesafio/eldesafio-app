/*
  Warnings:

  - Changed the type of `isNormalPregnancy` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasCompleteVaccination` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasCongenitalHeartDisease` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasHypertension` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasHeartMurmurs` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasArrhythmia` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasAllergy` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasFoodRestriction` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasChronicDisease` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isTakingMedication` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hasBeenHospitalized` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `canDoPhysicalActivity` on the `ParticipantHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FormAnswerOptions" AS ENUM ('YES', 'NO', 'DKNA');

-- AlterTable
ALTER TABLE "ParticipantHealth" DROP COLUMN "isNormalPregnancy",
ADD COLUMN     "isNormalPregnancy" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasCompleteVaccination",
ADD COLUMN     "hasCompleteVaccination" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasCongenitalHeartDisease",
ADD COLUMN     "hasCongenitalHeartDisease" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasHypertension",
ADD COLUMN     "hasHypertension" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasHeartMurmurs",
ADD COLUMN     "hasHeartMurmurs" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasArrhythmia",
ADD COLUMN     "hasArrhythmia" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasAllergy",
ADD COLUMN     "hasAllergy" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasFoodRestriction",
ADD COLUMN     "hasFoodRestriction" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasChronicDisease",
ADD COLUMN     "hasChronicDisease" "FormAnswerOptions" NOT NULL,
DROP COLUMN "isTakingMedication",
ADD COLUMN     "isTakingMedication" "FormAnswerOptions" NOT NULL,
DROP COLUMN "hasBeenHospitalized",
ADD COLUMN     "hasBeenHospitalized" "FormAnswerOptions" NOT NULL,
DROP COLUMN "canDoPhysicalActivity",
ADD COLUMN     "canDoPhysicalActivity" "FormAnswerOptions" NOT NULL;
