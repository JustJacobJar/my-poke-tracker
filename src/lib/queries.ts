"use client";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { IPokeCardInfo, IPokeTeam } from "./types";
import {
  fetchAuthorName,
  fetchPokeTeam,
  fetchTeamPage,
  fetchTeamPageByAuthor,
} from "@/server/fetchActions";
import {
  ChangeDisplayName,
  CreateTeam,
  DeleteTeam,
  DeleteUser,
  EditTeam,
} from "@/server/submitActions";
import { useRouter } from "next/navigation";

import pokeFile from "../data/PokemonList.json";
import { IPokeData } from "@/components/Autocomplete";
const pokeList: IPokeData[] = pokeFile.pokemon;

export function usePokeQuery(name: string) {
  const baseApiUrl = "https://pokeapi.co/api/v2/pokemon-form/";
  const query = useSuspenseQuery({
    queryKey: ["pokeCard", name],
    staleTime: "static",
    queryFn: async () => {
      //Get id of name
      const foundElement = (name: string) =>
        pokeList.find((element) => element.name == name)?.id;

      const id = foundElement(name.toLowerCase());

      const path = id ? id : name.toLowerCase();
      const url = baseApiUrl + path;

      const res = await fetch(url);
      if (!res.ok) {
        return null;
      }

      const data: IPokeCardInfo = await res.json();

      return data;
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
    queryFn: ({ pageParam }) => fetchTeamPage({ pageParam }),
    initialPageParam: 1,
    // maxPages: 1,
    getNextPageParam: (lastPage) => {
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

export function useTeamsByAuthorQuery(id: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["teams", id],
    meta: { id },
    queryFn: ({ pageParam, meta }) =>
      fetchTeamPageByAuthor({ pageParam, meta }),
    initialPageParam: 1,
    // maxPages: 10,
    getNextPageParam: (lastPage) => {
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

export function useCreateTeamMutate() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: IPokeTeam) => {
      return await CreateTeam(formData);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      router.push(`/dashboard/team/${data.id}`);
    },
  });
  return [mutation] as const;
}

export function useEditTeamMutate() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: IPokeTeam) => {
      return await EditTeam(formData);
    },
    onSuccess(data, variables) {
      queryClient.invalidateQueries({ queryKey: ["team", variables.id] });
      // queryClient.refetchQueries({ queryKey: ["team", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      router.push(`/dashboard/team/${data.id}`);
    },
  });
  return [mutation] as const;
}

export function useDeleteTeamMutate() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      teamId,
      redir = true,
    }: {
      teamId: string;
      redir: boolean;
    }) => {
      return await DeleteTeam(teamId, redir);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["team", data.teamId] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      if (data.redir) {
        router.push(`/dashboard/collections/`);
      }
    },
  });
  return [mutation] as const;
}

export function useEditDisplayNameMutate() {
  const mutation = useMutation({
    mutationFn: async ({ userId, name }: { userId: string; name: string }) => {
      return await ChangeDisplayName(userId, name);
    },
  });
  return [mutation] as const;
}

export function useDeleteUserMutate() {
  const mutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      return await DeleteUser(userId);
    },
  });
  return [mutation] as const;
}
