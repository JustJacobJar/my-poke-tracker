"use client";

import { Suspense } from "react";
import { textSkeleton } from "../Skeleton";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";

const baseApiUrl = "https://pokeapi.co/api/v2/pokemon-form/";

const typeColour: { [type: string]: string } = {
  normal: "bg-[#AAAB98] ",
  fire: "bg-[#FE4423]",
  water: "bg-[#3299FE]",
  electric: "bg-[#FECC32]",
  grass: "bg-[#76CD55]",
  ice: "bg-[#66CDFE]",
  fighting: "bg-[#BB5445]",
  poison: "bg-[#AA5599]",
  ground: "bg-[#DCBB54]",
  flying: "bg-[#8999FE]",
  psychic: "bg-[#FF5498]",
  bug: "bg-[#ABBA22]",
  rock: "bg-[#BAAA67]",
  ghost: "bg-[#6767BB]",
  dragon: "bg-[#7766EE] text-white",
  dark: "bg-[#765545] text-white",
  steel: "bg-[#AAAABB]",
  fairy: "bg-[#EF99EF]",
};

function TypeLable({ type }: { type: string }) {
  if (type == "null") {
    return null;
  }

  return (
    <label
      className={`${typeColour[type]} text-dark-xd w-1/3 min-w-fit grow rounded-md p-1 text-center text-sm sm:rounded-lg sm:text-base`}
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
    <div className="bg-card inset-ring-border flex aspect-[3/4] w-full flex-col place-content-around place-items-center gap-2 rounded-xl p-4 shadow-sm inset-ring-4">
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
