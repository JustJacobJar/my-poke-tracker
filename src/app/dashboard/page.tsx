/** @format */
import { PokeCard } from "@/components/Cards/PokeCards";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import {
  PokeCardEmpty,
  PokeCardSkeleton,
} from "@/components/Cards/PokeCardsSkeleton";

export default async function Dashboard() {
  const teams = await prisma.pokemonTeam.findMany();

  return (
    <>
      <nav className="bg-card flex h-16 w-full flex-row place-content-evenly place-items-center">
        <Link className="bg-primary rounded-md px-4 py-2" href={"/dashboard"}>
          Home
        </Link>
        <Link className="bg-primary rounded-md px-4 py-2" href={"/dashboard"}>
          Collections
        </Link>
        <Link className="bg-primary rounded-md px-4 py-2" href={"/dashboard"}>
          Login
        </Link>
      </nav>
      <div className="flex flex-col place-items-center gap-4 p-4">
        {teams.map((data, index) => {
          return <PokeTeam pokeTeam={data} key={index} />;
        })}
      </div>
    </>
  );
}

export function PokeTeamEmpty() {
  return (
    <div className="grid w-fit grid-cols-3 gap-4">
      <PokeCardEmpty />
      <PokeCardEmpty />
      <PokeCardEmpty />
      <PokeCardEmpty />
      <PokeCardEmpty />
      <PokeCardEmpty />
    </div>
  );
}

interface IPokeTeam {
  id: string;
  Pokemon: string[];
}

function PokeTeam({ pokeTeam }: { pokeTeam: IPokeTeam }) {
  /*
    Takes in data to fill in the 6 slots.
    Either empty or filled
    Filled fallback to loading skeleton    

    read the pokemon
    if there is pokemon, placeholder with name
      hydrate with api data later
    if not, empty card
  */

  const pokemon = (team: IPokeTeam) => {
    const elements = [];
    for (let index = 0; index < 6; index++) {
      if (team.Pokemon[index] != null) {
        elements.push(
          <Suspense key={index} fallback={<PokeCardSkeleton key={index} />}>
            <PokeCard name={team.Pokemon[index]} key={index} />
          </Suspense>,
        );
      } else {
        elements.push(<PokeCardEmpty key={index} />);
      }
    }
    return elements;
  };

  return (
    <div className="grid w-fit grid-cols-3 gap-4">{pokemon(pokeTeam)}</div>
  );
}
