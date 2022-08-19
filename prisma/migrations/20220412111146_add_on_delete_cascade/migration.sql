-- DropForeignKey
ALTER TABLE "UsersOnPrograms" DROP CONSTRAINT "UsersOnPrograms_programId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnPrograms" DROP CONSTRAINT "UsersOnPrograms_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnPrograms" ADD CONSTRAINT "UsersOnPrograms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnPrograms" ADD CONSTRAINT "UsersOnPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
