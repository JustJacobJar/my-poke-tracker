"use server";
import prisma from "@/lib/prisma";
import Link from "next/link";

import PokeTeam from "@/components/Cards/PokeTeam";
import { SignOut } from "@/components/SignOut";
import { auth } from "@/lib/auth";
import SignIn from "@/components/SignIn";

export default async function Dashboard() {
  const session = await auth();
  const teams = await prisma.pokemonTeam.findMany(); //pagenate this

  const signedIn = () => {
    if (!session?.user) {
      return <div>Not signed in!</div>;
    }
    return <div>Signed in. ID:{session.user.id}</div>;
  };

  return (
    <>
      <nav className="bg-card flex h-16 w-full flex-row place-content-evenly place-items-center">
        <Link className="bg-primary rounded-md px-4 py-2" href={"/dashboard"}>
          Home
        </Link>
        <Link
          className="bg-primary rounded-md px-4 py-2"
          href={"/dashboard/collections"}
        >
          Collections
        </Link>
        <SignIn />
        <SignOut />
      </nav>
      <div>{signedIn()}</div>

      <div className="flex flex-col place-items-center gap-4 p-4">
        {teams.map((data, index) => {
          return (
            <a
              className="bg-card rounded-2xl border-2 p-2"
              href={`/team/${data.id}`}
              key={index}
            >
              <h1 className="px-2 pb-2 text-lg">{data.name}</h1>
              <PokeTeam pokeTeam={data} />
            </a>
          );
        })}
      </div>
    </>
  );
}
