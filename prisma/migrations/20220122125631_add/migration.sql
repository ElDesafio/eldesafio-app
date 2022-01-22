-- CreateEnum
CREATE TYPE "ParticipantsOnProgramsStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'WAITING');

-- AlterTable
ALTER TABLE "ParticipantsOnPrograms" ADD COLUMN     "status" "ParticipantsOnProgramsStatus" NOT NULL DEFAULT E'ACTIVE',
ADD COLUMN     "waitingListOrder" INTEGER;
