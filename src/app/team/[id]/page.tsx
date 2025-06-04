"use server";

import PokeTeam from "@/components/Cards/PokeTeam";
import PokeTeamSkeleton from "@/components/Cards/PokeTeamSkeleton";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default async function TeamView({
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

  if (team == null) {
    return (
      <>
        <div>Team Not Found</div>
      </>
    );
  }

  //Only show edit button if you are the team owner
  const editButton = () => {
    if (session?.user?.id === author?.id) {
      return (
        <a
          href={`/dashboard/collections/edit/${id}`}
          className="bg-secondary stroke-foreground hover:stroke-card aspect-square place-self-center rounded-md p-2 transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
        </a>
      );
    }
    return;
  };

  return (
    <div>
      <Suspense fallback={<PokeTeamSkeleton />}>
        <div className="size-fit p-2">
          <div className="flex flex-row place-content-between px-4">
            <div className="flex flex-col">
              <h1>{team.name}</h1>
              <h2>Created by: {author?.name}</h2>
            </div>
            {editButton()}
          </div>
          <PokeTeam pokeTeam={team} />
          <p>{team.description}</p>
        </div>
      </Suspense>
    </div>
  );
}
