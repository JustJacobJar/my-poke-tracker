-- CreateTable
CREATE TABLE "PokemonTeam" (
    "id" TEXT NOT NULL,
    "Pokemon" TEXT[],

    CONSTRAINT "PokemonTeam_pkey" PRIMARY KEY ("id")
);
