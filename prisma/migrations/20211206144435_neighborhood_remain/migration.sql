/*
  Warnings:

  - You are about to drop the column `neigborhood` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "neigborhood",
ADD COLUMN     "neighborhood" "Barrio";
