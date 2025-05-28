"use client";

import { PokeCardSkeleton } from "./PokeCardsSkeleton";

export default function PokeTeamSkeleton() {
  return (
    <div>
      <div>
        <div>Team Name</div>
      </div>
      <div className="grid w-fit grid-cols-3 gap-4">
        <PokeCardSkeleton />
        <PokeCardSkeleton />
        <PokeCardSkeleton />
        <PokeCardSkeleton />
        <PokeCardSkeleton />
        <PokeCardSkeleton />
      </div>
    </div>
  );
}
