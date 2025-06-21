"use client";

import { Suspense } from "react";
import { textSkeleton } from "../Skeleton";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";

const baseApiUrl = "https://pokeapi.co/api/v2/pokemon-form/";

const typeColour: { [type: string]: string } = {
  normal: "bg-[#AAAB98] text-black",
  fire: "bg-[#FE4423] text-black",
  water: "bg-[#3299FE] text-black",
  electric: "bg-[#FECC32] text-black",
  grass: "bg-[#76CD55] text-black",
  ice: "bg-[#66CDFE] text-black",
  fighting: "bg-[#BB5445] text-black",
  poison: "bg-[#AA5599] text-black",
  ground: "bg-[#DCBB54] text-black",
  flying: "bg-[#8999FE] text-black",
  psychic: "bg-[#FF5498] text-black",
  bug: "bg-[#ABBA22] text-black",
  rock: "bg-[#BAAA67] text-black",
  ghost: "bg-[#6767BB] text-black",
  dragon: "bg-[#7766EE] text-white",
  dark: "bg-[#765545] text-white",
  steel: "bg-[#AAAABB] text-black",
  fairy: "bg-[#EF99EF] text-black",
};

function TypeLable({ type }: { type: string }) {
  if (type == "null") {
    return null;
  }

  return (
    <label
      className={`${typeColour[type]} text-dark-xd w-full min-w-fit rounded-md p-1 text-center text-base`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </label>
  );
}

function usePokeQuery(name: string) {
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

interface IPokeCardInfo {
  name: string;
  sprites: { front_default: string };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

export function PokeCard({ name }: { name: string }) {
  //Provide it with the image, types, name

  const [data] = usePokeQuery(name);

  return (
    <div className="bg-card inset-ring-border aspect-[9/13] flex min-w-44 grow flex-col place-content-around place-items-center gap-2 rounded-xl p-4 shadow-sm inset-ring-4">
      <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <Suspense fallback={<ImageLoading />}>
        <Image
          height={96}
          width={96}
          alt="Pokemon Sprite"
          src={data.sprites.front_default}
          className="aspect-square w-full rounded-lg"
        />
      </Suspense>
      <div className="flex w-full place-content-evenly gap-2">
        <Suspense fallback={<TypeLoading />}>
          {data.types.map((types, index) => {
            return <TypeLable type={types.type.name} key={index} />;
          })}
        </Suspense>
      </div>
    </div>
  );
}

function ImageLoading() {
  return (
    <div className="bg-muted/50 aspect-square h-fit w-full animate-pulse rounded-2xl" />
  );
}

function TypeLoading() {
  return (
    <div className="flex w-full place-content-evenly">
      <label className={cn(textSkeleton, "w-1/3")}></label>
      <label className={cn(textSkeleton, "w-1/3")}></label>
    </div>
  );
}
