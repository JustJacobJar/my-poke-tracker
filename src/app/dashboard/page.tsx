/** @format */
import {
  PokeCard,
  PokeCardEmpty,
  PokeCardSkeleton,
} from "@/components/Cards/PokeCards";
import Link from "next/link";

export default function Dashboard() {
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
        <PokeTeamSkeleton />
        <PokeTeam />
        <PokeTeam />
      </div>
    </>
  );
}

function PokeTeamSkeleton() {
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

function PokeTeam() {
  /*
    Takes in data to fill in the 6 slots.
    Either empty or filled
    Filled fallback to loading skeleton    
  */

  return (
    <div className="grid w-fit grid-cols-3 gap-4">
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCard />
      <PokeCardSkeleton />
      <PokeCard />
      <PokeCardSkeleton />
    </div>
  );
}
