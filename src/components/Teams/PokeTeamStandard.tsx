import { prisma } from "@/app/prisma";
import { auth } from "@/lib/auth";
import { IPokeTeam } from "@/lib/types";
import PokeTeamMinimal from "./PokeTeamMinimal";
import { Suspense } from "react";
import PokeTeamSkeleton from "./PokeTeamSkeleton";
import DeleteButtonModal from "../DeleteButtonModal";

/**
 *
 * @param extended Shows the team description if true
 * @returns PokeTeam with author name and conditional edit button linking to the edit page
 */
export default async function PokeTeamStandard({
  pokeTeam,
  extended = false,
  redirect = extended,
}: {
  pokeTeam: IPokeTeam;
  extended?: boolean;
  redirect?: boolean;
}) {
  const session = await auth();

  //Used for author name display
  const author = await prisma.user.findUnique({
    where: { id: pokeTeam?.authorId },
  });

  //Only show edit button if you are the team owner
  const editButton = () => {
    if (session?.user?.id === pokeTeam.authorId) {
      return (
        <a
          href={`/dashboard/collections/edit/${pokeTeam.id}`}
          className="bg-secondary stroke-foreground hover:stroke-card aspect-square place-self-center rounded-md p-2 transition-all duration-150 hover:brightness-125"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
        </a>
      );
    }
    return;
  };

  const deleteButton = () => {
    if (!pokeTeam.id) return;
    if (session?.user?.id === pokeTeam.authorId) {
      return <DeleteButtonModal teamId={pokeTeam.id} redirect={redirect} />;
    }
  };

  return (
    <Suspense fallback={<PokeTeamSkeleton />}>
      <div className="flex w-full flex-col gap-4 p-2">
        <div className="flex flex-row place-content-between px-4">
          <div className="flex flex-col">
            {/* Maybe make this clickable link */}
            <a
              className={redirect ? "pointer-events-none" : ""}
              href={`/team/${pokeTeam.id}`}
            >
              <h1 className="text-lg hover:underline">
                {pokeTeam.name ? pokeTeam.name : "No team name"}
              </h1>
            </a>
            <h2>Created by: {author?.name ? author.name : "Not Found"}</h2>
          </div>
          <div className="flex flex-row gap-4">
            {deleteButton()}
            {editButton()}
          </div>
        </div>
        <PokeTeamMinimal pokeTeam={pokeTeam} />
        <p className="px-2">
          {extended
            ? pokeTeam.description
              ? pokeTeam.description
              : "No team description"
            : null}
        </p>
      </div>
      {/* Modal */}
    </Suspense>
  );
}
