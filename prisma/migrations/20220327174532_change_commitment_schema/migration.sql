-- AlterTable
ALTER TABLE "ParticipantCommitment" ALTER COLUMN "aprilStatus" DROP NOT NULL,
ALTER COLUMN "aprilStatus" DROP DEFAULT,
ALTER COLUMN "mayStatus" DROP NOT NULL,
ALTER COLUMN "mayStatus" DROP DEFAULT,
ALTER COLUMN "juneStatus" DROP NOT NULL,
ALTER COLUMN "juneStatus" DROP DEFAULT,
ALTER COLUMN "julyStatus" DROP NOT NULL,
ALTER COLUMN "julyStatus" DROP DEFAULT,
ALTER COLUMN "augustStatus" DROP NOT NULL,
ALTER COLUMN "augustStatus" DROP DEFAULT,
ALTER COLUMN "septemberStatus" DROP NOT NULL,
ALTER COLUMN "septemberStatus" DROP DEFAULT,
ALTER COLUMN "octoberStatus" DROP NOT NULL,
ALTER COLUMN "octoberStatus" DROP DEFAULT,
ALTER COLUMN "novemberStatus" DROP NOT NULL,
ALTER COLUMN "novemberStatus" DROP DEFAULT,
ALTER COLUMN "decembreStatus" DROP NOT NULL,
ALTER COLUMN "decembreStatus" DROP DEFAULT;

-- DropEnum
DROP TYPE "ParticipantCommitmentType";
