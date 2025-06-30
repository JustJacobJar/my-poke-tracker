"use client";

import { Suspense } from "react";
import { textSkeleton } from "../Skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePokeQuery } from "@/lib/queries";
import { PokeCardError } from "./PokeCardsSkeleton";

export function PokeCard({ name }: { name: string }) {
  const [data] = usePokeQuery(name);

  if (!data) {
    return <PokeCardError name={name} />;
  }

  return (
    <div className="bg-card inset-ring-border flex aspect-[9/13] min-w-44 grow flex-col place-content-around place-items-center gap-2 rounded-xl p-4 shadow-sm inset-ring-4">
      <label className="line-clamp-1">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <Suspense fallback={<ImageLoading />}>
        <Image
          height={96}
          width={96}
          unoptimized
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

/**
 * @summary Image skeleton
 */
function ImageLoading() {
  return (
    <div className="bg-muted/50 aspect-square h-fit w-full animate-pulse rounded-2xl" />
  );
}

/**
 * @summary Type Skeleton
 */
function TypeLoading() {
  return (
    <div className="flex w-full place-content-evenly">
      <label className={cn(textSkeleton, "w-1/3")}></label>
      <label className={cn(textSkeleton, "w-1/3")}></label>
    </div>
  );
}

/**
 * @summary
 * Formats the type with correct background and capitalisation
 */
function TypeLable({ type }: { type: string }) {
  if (type == "null") {
    return null;
  }

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

  return (
    <label
      className={`${typeColour[type]} text-dark-xd w-full min-w-fit rounded-md p-1 text-center text-base`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </label>
  );
}
