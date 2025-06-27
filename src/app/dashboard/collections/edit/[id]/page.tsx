"use server";

import { prisma } from "@/prisma";
import { auth } from "@/lib/auth";
import EditTeamFormPage from "./EditTeamForm";

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
    <div className="flex w-11/12 max-w-4xl justify-self-center place-content-center p-4">
        <EditTeamFormPage team={team} />
    </div>
  );
}
