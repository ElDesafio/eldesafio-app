/*
  Warnings:

  - Added the required column `createdBy` to the `ParticipantHealth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `ParticipantHealth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ParticipantHealth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantHealth" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedBy" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ParticipantHealth" ADD CONSTRAINT "ParticipantHealth_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantHealth" ADD CONSTRAINT "ParticipantHealth_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
