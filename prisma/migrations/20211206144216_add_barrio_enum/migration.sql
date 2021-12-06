/*
  Warnings:

  - The `neigborhood` column on the `Participant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `sex` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Barrio" AS ENUM ('LA_LATA', 'MORENO', 'SAN_FRANCISQUITO', 'OTRO');

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "neigborhood",
ADD COLUMN     "neigborhood" "Barrio",
ALTER COLUMN "sex" SET NOT NULL;
