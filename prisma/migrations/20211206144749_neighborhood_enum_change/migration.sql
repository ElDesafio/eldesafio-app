/*
  Warnings:

  - The values [OTRO] on the enum `Neighborhood` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Neighborhood_new" AS ENUM ('LA_LATA', 'MORENO', 'SAN_FRANCISQUITO', 'OTHER');
ALTER TABLE "Participant" ALTER COLUMN "neighborhood" TYPE "Neighborhood_new" USING ("neighborhood"::text::"Neighborhood_new");
ALTER TYPE "Neighborhood" RENAME TO "Neighborhood_old";
ALTER TYPE "Neighborhood_new" RENAME TO "Neighborhood";
DROP TYPE "Neighborhood_old";
COMMIT;
