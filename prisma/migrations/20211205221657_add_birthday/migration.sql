/*
  Warnings:

  - Added the required column `birthday` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "birthday" DATE NOT NULL,
ALTER COLUMN "healthCertificateDate" DROP NOT NULL,
ALTER COLUMN "healthCertificateDate" DROP DEFAULT,
ALTER COLUMN "healthCertificateDate" SET DATA TYPE DATE;
