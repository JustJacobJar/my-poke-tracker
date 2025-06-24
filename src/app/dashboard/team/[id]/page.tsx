"use client";

import PokeTeamStandard from "@/components/Teams/PokeTeamStandard";
import { useTeamQuery } from "@/lib/queries";
import { useParams } from "next/navigation";

export default function TeamView() {
  const params = useParams<{ id: string }>();
  const [team] = useTeamQuery(params.id);

  if (team == null) {
    return (
      <>
        <div>Team Not Found</div>
      </>
    );
  }

  return (
    <div className="flex w-11/12 max-w-4xl place-content-center justify-self-center p-4">
      <PokeTeamStandard pokeTeam={team} extended={true} />
    </div>
  );
}
