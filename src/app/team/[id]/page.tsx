"use server";

import PokeTeam from "@/components/Cards/PokeTeam";
import PokeTeamSkeleton from "@/components/Cards/PokeTeamSkeleton";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default async function TeamView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
    <div>
      <Suspense fallback={<PokeTeamSkeleton />}>
        <PokeTeam pokeTeam={team} />
      </Suspense>
    </div>
  );
}
