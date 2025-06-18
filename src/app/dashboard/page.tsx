"use server";
import prisma from "@/lib/prisma";
import PokeTeamMinimal from "@/components/Teams/PokeTeamMinimal";

export default async function Dashboard() {
  const teams = await prisma.pokemonTeam.findMany(); //pagenate this

  return (
    <>
      <div className="grid w-full grid-cols-1 flex-wrap place-items-center gap-4 place-self-center p-4 xl:grid-cols-3 2xl:w-4/5">
        {teams.map((data, index) => {
          return (
            <a
              className="bg-card flex w-full h-full flex-col rounded-2xl border-2 p-2 "
              href={`/dashboard/team/${data.id}`}
              key={index}
            >
              <h1 className="px-2 pb-2 text-lg">
                {data.name ? data.name : "No team name"}
              </h1>
              <PokeTeamMinimal pokeTeam={data} />
            </a>
          );
        })}
      </div>
    </>
  );
}
