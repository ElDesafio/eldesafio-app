/*
  Warnings:

  - Changed the type of `changedSchool` on the `SurveyBiography` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `repeatedYear` on the `SurveyBiography` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `participatedBefore` on the `SurveyBiography` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `otherActivities` on the `SurveyBiography` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SurveyBiography" DROP COLUMN "changedSchool",
ADD COLUMN     "changedSchool" "FormAnswerOptions" NOT NULL,
DROP COLUMN "repeatedYear",
ADD COLUMN     "repeatedYear" "FormAnswerOptions" NOT NULL,
DROP COLUMN "participatedBefore",
ADD COLUMN     "participatedBefore" "FormAnswerOptions" NOT NULL,
DROP COLUMN "otherActivities",
ADD COLUMN     "otherActivities" "FormAnswerOptions" NOT NULL;
