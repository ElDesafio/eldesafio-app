-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'ZERO_POSITIVE', 'ZERO_NEGATIVE');

-- CreateTable
CREATE TABLE "ParticipantHealth" (
    "participantId" INTEGER NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "isNormalPregnancy" BOOLEAN NOT NULL,
    "hasCompleteVaccination" BOOLEAN NOT NULL,
    "missingVaccines" TEXT,
    "hasCongenitalHeartDisease" BOOLEAN NOT NULL,
    "hasHypertension" BOOLEAN NOT NULL,
    "hasHeartMurmurs" BOOLEAN NOT NULL,
    "hasArrhythmia" BOOLEAN NOT NULL,
    "hasAllergy" BOOLEAN NOT NULL,
    "allergyDetails" TEXT,
    "hasFoodRestriction" BOOLEAN NOT NULL,
    "foodRestrictionDetails" TEXT,
    "hasChronicDisease" BOOLEAN NOT NULL,
    "chronicDiseaseDetails" TEXT,
    "isTakingMedication" BOOLEAN NOT NULL,
    "takingMedicationDetails" TEXT,
    "hasBeenHospitalized" BOOLEAN NOT NULL,
    "hospitalizedDetails" TEXT,
    "canDoPhysicalActivity" BOOLEAN NOT NULL,
    "Observation" TEXT,

    CONSTRAINT "ParticipantHealth_pkey" PRIMARY KEY ("participantId")
);

-- AddForeignKey
ALTER TABLE "ParticipantHealth" ADD CONSTRAINT "ParticipantHealth_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
