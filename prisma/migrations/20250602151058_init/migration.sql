/*
  Warnings:

  - Added the required column `authorId` to the `PokemonTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PokemonTeam" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PokemonTeam" ADD CONSTRAINT "PokemonTeam_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
