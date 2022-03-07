/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'MENTOR', 'FACILITATOR', 'FACILITATOR_VOLUNTEER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "biography" TEXT,
ADD COLUMN     "birthday" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone1" TEXT,
ADD COLUMN     "phone2" TEXT,
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "twitter" TEXT;

-- CreateTable
CREATE TABLE "UserRoles" (
    "userId" INTEGER NOT NULL,
    "role" "Roles" NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("userId","role")
);

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
