-- CreateEnum
CREATE TYPE "PhoneBelongsTo" AS ENUM ('SELF', 'MOTHER', 'FATHER', 'TUTOR');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone1" TEXT,
ADD COLUMN     "phone1BelongsTo" "PhoneBelongsTo" DEFAULT E'SELF',
ADD COLUMN     "phone1HasWhatsapp" BOOLEAN DEFAULT false,
ADD COLUMN     "phone2" TEXT,
ADD COLUMN     "phone2BelongsTo" "PhoneBelongsTo" DEFAULT E'SELF',
ADD COLUMN     "phone2HasWhatsapp" BOOLEAN DEFAULT false;
