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

  const teams = () => {
    if (myCollections.length == 0) {
      return <div>You have no teams yet...</div>;
    }
    return (
      <Feed>
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
      </Feed>
    );
  };

  return (
    <div className="flex w-full flex-col place-items-center place-self-center">
      <h1 className="py-8 text-4xl font-bold">Your Teams</h1>
      {teams()}
    </div>
  );
}
