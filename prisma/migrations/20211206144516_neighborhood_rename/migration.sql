/*
  Warnings:

  - The `neighborhood` column on the `Participant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Neighborhood" AS ENUM ('LA_LATA', 'MORENO', 'SAN_FRANCISQUITO', 'OTRO');

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "neighborhood",
ADD COLUMN     "neighborhood" "Neighborhood";

-- DropEnum
DROP TYPE "Barrio";
