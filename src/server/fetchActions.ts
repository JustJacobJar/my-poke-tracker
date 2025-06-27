"use server";

import { prisma } from "@/app/prisma";

const COUNT = 9;

export const fetchTeamPage = async ({ pageParam }: { pageParam: number }) => {
  const teams = await prisma.pokemonTeam.findMany({
    orderBy: { createdAt: "desc" },
    skip: Math.max(pageParam - 1, 0) * COUNT,
    take: COUNT,
  });

  if (teams.length < COUNT) {
    return { data: teams, nextPage: pageParam + 1, hasMore: false };
  }
  return { data: teams, nextPage: pageParam + 1, hasMore: true };
};

export const fetchTeamPageByAuthor = async ({
  pageParam,
  meta,
}: {
  pageParam: number;
  meta: Record<string, unknown> | undefined;
}) => {
  if (!meta) throw "No author Id";

  const teams = await prisma.pokemonTeam.findMany({
    where: { authorId: meta.id as string },
    orderBy: { createdAt: "asc" },
    skip: Math.max(pageParam - 1, 0) * COUNT,
    take: COUNT,
  });

  if (teams.length < COUNT) {
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
