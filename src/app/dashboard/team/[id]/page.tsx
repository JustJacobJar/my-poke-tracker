"use client";

import PokeTeamSkeleton from "@/components/Teams/PokeTeamSkeleton";
import PokeTeamStandard from "@/components/Teams/PokeTeamStandard";
import { useTeamQuery } from "@/lib/queries";
import { useParams } from "next/navigation";

export default function TeamView() {
  const params = useParams<{ id: string }>();
  const [team, query] = useTeamQuery(params.id);

  console.log(query);

  if (team == null) {
    return (
      <>
        <div>Team Not Found</div>
      </>
    );
  }

  return (
    <div className="flex w-11/12 max-w-4xl place-content-center justify-self-center p-4">
      {query.isFetching ? (
        <div className="flex w-full flex-col gap-4 pt-2">
          <PokeTeamSkeleton />
        </div>
      ) : (
        <PokeTeamStandard pokeTeam={team} extended={true} />
      )}
    </div>
  );
}
