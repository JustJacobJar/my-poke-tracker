"use server";

import { prisma } from "../prisma";

export const fetchTeamPage = async ({ pageParam }: { pageParam: number }) => {
  const count = 3;
  const teams = await prisma.pokemonTeam.findMany({
    orderBy: { createdAt: "desc" },
    skip: Math.max(pageParam - 1, 0) * count,
    take: count,
  });

  if (teams.length < count) {
    return { data: teams, nextPage: pageParam + 1, hasMore: false };
  }
  return { data: teams, nextPage: pageParam + 1, hasMore: true };
};

export async function fetchPokeTeam(id: string) {
  const team = await prisma.pokemonTeam.findUnique({
    where: {
      id: id,
    },
  });
  return team;
}

export async function fetchAuthorName(id: string) {
  const author = await prisma.user.findUnique({
    where: { id: id },
  });
  return author?.name;
}
