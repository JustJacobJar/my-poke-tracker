"use server";

import { prisma } from "@/app/prisma";
import { auth } from "@/lib/auth";
import EditTeamFormPage from "./EditTeamForm";
import { Suspense } from "react";
import PokeTeamSkeleton from "@/components/Teams/PokeTeamSkeleton";

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const team = await prisma.pokemonTeam.findUnique({
    where: {
      id: id,
    },
  });

  if (!team) {
    return <div>Team Not Found!</div>;
  }

  const author = await prisma.user.findUnique({
    where: { id: team?.authorId },
  });

  if (session?.user?.id !== author?.id) {
    return <div>This is not your team to edit</div>;
  }

  return (
    <div className="flex w-full xl:w-2/3 2xl:w-1/2 justify-self-center place-content-center p-4">
      <Suspense fallback={<PokeTeamSkeleton />}>
        <EditTeamFormPage team={team} />
      </Suspense>
    </div>
  );
}
