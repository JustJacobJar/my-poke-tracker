"use server";

import PokeTeamStandard from "@/components/Teams/PokeTeamStandard";
import prisma from "@/lib/prisma";

export default async function TeamView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //Team to display
  const team = await prisma.pokemonTeam.findUnique({
    where: {
      id: id,
    },
  });

  if (team == null) {
    return (
      <>
        <div>Team Not Found</div>
      </>
    );
  }

  return (
    <div className="flex w-11/12 max-w-4xl p-4 justify-self-center place-content-center">
      <PokeTeamStandard pokeTeam={team} extended={true} />
    </div>
  );
}
