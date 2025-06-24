import { useSuspenseQuery } from "@tanstack/react-query";
import prisma from "@/lib/prisma";
import { IPokeCardInfo, IPokeTeam } from "./types";

export function usePokeQuery(name: string) {
  const baseApiUrl = "https://pokeapi.co/api/v2/pokemon-form/";
  const query = useSuspenseQuery({
    queryKey: ["pokeCard", name],
    staleTime: Infinity,
    queryFn: async () => {
      const path = name.toLowerCase();
      const url = baseApiUrl + path;

      const res: IPokeCardInfo = await (await fetch(url)).json();
      return res;
    },
  });

  return [query.data, query] as const;
}

export function useTeamQuery(id: string) {
  const query = useSuspenseQuery({
    queryKey: ["team", id],
    queryFn: async () => {
      const team = await prisma.pokemonTeam.findUnique({
        where: {
          id: id,
        },
      });
      return team;
    },
  });
  return [query.data, query] as const;
}

export function useAuthorQuery(teamId: IPokeTeam) {
  const query = useSuspenseQuery({
    queryKey: ["authorName", teamId.authorId],
    queryFn: async () => {
      const author = await prisma.user.findUnique({
        where: { id: teamId.authorId },
      });
      return author;
    },
  });
  return [query.data, query] as const;
}
