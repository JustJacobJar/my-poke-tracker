import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const pokeData = [
  {
    pokemon: ["pikachu", "phantom", "ditto"],
    description: "This team consists of three pokemon. They are quite simple.",
  },
  {
    pokemon: ["raichu", "bulbasaur", "charizard"],
    description:
      "This team is almost like the starters but evolved, only kind of.",
  },
];

export async function main() {
  for (const i of pokeData) {
    await prisma.pokemonTeam.create({ data: i });
  }
}

main();
