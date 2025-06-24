"use client";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { IPokeCardInfo, IPokeTeam } from "./types";
import {
  fetchAuthorName,
  fetchPokeTeam,
  fetchTeamPage,
} from "@/app/server/fetchActions";
import { pages } from "next/dist/build/templates/app-page";

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
    queryFn: async () => await fetchPokeTeam(id),
  });
  return [query.data, query] as const;
}

export function useAuthorQuery(teamId: IPokeTeam) {
  const query = useSuspenseQuery({
    queryKey: ["authorName", teamId.authorId],
    queryFn: async () => await fetchAuthorName(teamId.authorId),
  });
  return [query.data, query] as const;
}

export function useTeamsQuery() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["teams"],
    queryFn: fetchTeamPage,
    initialPageParam: 1,
    // maxPages: 10,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return lastPage.nextPage;
    },
  });
  return [
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  ] as const;
}
