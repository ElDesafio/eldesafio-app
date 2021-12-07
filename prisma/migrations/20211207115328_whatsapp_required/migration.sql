/*
  Warnings:

  - Made the column `phone1HasWhatsapp` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone2HasWhatsapp` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "phone1HasWhatsapp" SET NOT NULL,
ALTER COLUMN "phone2HasWhatsapp" SET NOT NULL;
