"use client";
import { IPokeTeam } from "@/lib/types";
import PokeTeamMinimal from "./PokeTeamMinimal";
import DeleteButtonModal from "../DeleteButtonModal";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAuthorQuery } from "@/lib/queries";
import { Suspense } from "react";
import PokeTeamSkeleton from "./PokeTeamSkeleton";

/**
 *
 * @param extended Shows the team description if true
 * @returns PokeTeam with author name and conditional edit button linking to the edit page
 */
export default function PokeTeamStandard({
  pokeTeam,
  extended = false,
  redirect = extended,
}: {
  pokeTeam: IPokeTeam;
  extended?: boolean;
  redirect?: boolean;
}) {
  const { data: session, status } = useSession();
  const [author] = useAuthorQuery(pokeTeam);

  //Only show edit button if you are the team owner
  const editButton = () => {
    if (status === "authenticated") {
      if (session.user?.id === pokeTeam.authorId) {
        return (
          <Link
            href={`/dashboard/collections/edit/${pokeTeam.id}`}
            className="bg-secondary stroke-secondary-foreground aspect-square place-self-center rounded-md p-2 transition-normal duration-150 hover:inset-ring-1 hover:brightness-90"
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
          </Link>
        );
      }
    }
    return;
  };

  const deleteButton = () => {
    if (status === "authenticated") {
      if (!pokeTeam.id) return;
      if (session?.user?.id === pokeTeam.authorId) {
        return <DeleteButtonModal teamId={pokeTeam.id} redirect={redirect} />;
      }
    }
    return;
  };

  return (
    <div className="flex w-full flex-col gap-4 pt-2">
      <Suspense fallback={<PokeTeamSkeleton />}>
        <div className="flex flex-row place-content-between px-4">
          <div className="flex flex-col">
            <a
              className={redirect ? "pointer-events-none" : ""}
              href={`/dashboard/team/${pokeTeam.id}`}
            >
              <h1 className="text-lg hover:underline">
                {pokeTeam.name ? pokeTeam.name : "No team name"}
              </h1>
            </a>
            <h2>Created by: {author ? author : "Not Found"}</h2>
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
      </Suspense>
    </div>
  );
}
