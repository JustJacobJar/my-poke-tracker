"use server";
import prisma from "@/lib/prisma";
import Link from "next/link";

import PokeTeam from "@/components/Cards/PokeTeam";

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
