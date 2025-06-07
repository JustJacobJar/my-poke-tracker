"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import PokeTeamMinimal from "@/components/Teams/PokeTeamMinimal";

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
              <PokeTeamMinimal pokeTeam={data} />
            </a>
          );
        })}
      </div>
    </>
  );
}
