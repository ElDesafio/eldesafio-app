/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participant_dni_key" ON "Participant"("dni");
