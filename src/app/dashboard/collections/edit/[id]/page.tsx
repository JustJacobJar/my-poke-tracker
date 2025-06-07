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

  const author = await prisma.user.findUnique({
    where: { id: team?.authorId },
  });

  if (!team) {
    return <div>Team Not Found!</div>;
  }

  if (session?.user?.id !== author?.id) {
    return <div>This is not your team to edit</div>;
  }

  return (
    <Suspense fallback={<PokeTeamSkeleton />}>
      <EditTeamFormPage team={team} />
    </Suspense>
  );
}
