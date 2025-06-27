"use client";
import { PokeCard } from "../Cards/PokeCards";
import { PokeCardEmpty } from "../Cards/PokeCardsSkeleton";
import { IPokeTeam } from "@/lib/types";

export default function PokeTeamMinimal({ pokeTeam }: { pokeTeam: IPokeTeam }) {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-4 sm:grid-cols-3 sm:grid-rows-2">
      {pokeTeam.pokemon.map((pokeName, index) => {
        if (pokeName != null && pokeName !== "" && pokeName != undefined) {
          return <PokeCard name={pokeName} key={index} />;
        }
        return <PokeCardEmpty key={index} />;
      })}
    </div>
  );
}
