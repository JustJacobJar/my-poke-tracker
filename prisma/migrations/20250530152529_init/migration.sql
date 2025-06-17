/*
  Warnings:

  - You are about to drop the column `Pokemon` on the `PokemonTeam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PokemonTeam" DROP COLUMN "Pokemon",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "pokemon" TEXT[];
