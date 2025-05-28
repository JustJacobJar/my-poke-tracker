import prisma from "./prisma";

export async function fetchPokeTeam(id: string) {
  const data = await prisma.pokemonTeam.findUnique({
    where: {
      id: id,
    },
  });
  return data;
}
