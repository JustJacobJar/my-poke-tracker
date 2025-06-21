"use server";

import { prisma } from "@/app/prisma";
import Feed from "@/components/Feed";
import PokeTeamStandard from "@/components/Teams/PokeTeamStandard";
import { auth } from "@/lib/auth";

export default async function CollectionPage() {
  const session = await auth();
  const myCollections = await prisma.pokemonTeam.findMany({
    where: { authorId: session?.user?.id },
  }); //pagenate this

  return (
    <div className="flex w-full flex-col place-items-center place-self-center">
      <h1 className="py-8 text-4xl font-bold">Your Teams</h1>
      <Feed>
        {/* <div className="grid w-full grid-cols-1 flex-wrap place-items-center gap-4 place-self-center p-4 xl:grid-cols-3 2xl:w-4/5"> */}
        {myCollections.map((data, index) => {
          return (
            <div
              className="bg-card flex h-full w-full flex-col rounded-2xl border-2 px-2"
              key={index}
            >
              <PokeTeamStandard pokeTeam={data} />
            </div>
          );
        })}
        {/* </div> */}
      </Feed>
    </div>
  );
}
