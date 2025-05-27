import { PrismaClient, Prisma } from "../generated/prisma";

const prisma = new PrismaClient();

const pokeData = [
  {
    Pokemon: ["pikachu", "phantom", "ditto"],
  },
  {
    Pokemon: ["raichu", "bulbasaur", "charizard"],
  },
];

export async function main() {
  for (const i of pokeData) {
    await prisma.pokemonTeam.create({ data: i });
  }
}

main();
