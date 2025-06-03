/*
  Warnings:

  - Made the column `description` on table `PokemonTeam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `PokemonTeam` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PokemonTeam" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'No description...',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'No Name';
