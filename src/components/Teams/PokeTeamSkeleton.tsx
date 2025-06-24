"use client";

import { cn } from "@/lib/utils";
import { PokeCardSkeleton } from "../Cards/PokeCardsSkeleton";
import { textSkeleton } from "../Skeleton";

export default function PokeTeamSkeleton() {
  return (
    <>
      <div className="flex w-1/2 flex-col gap-2 pl-4">
        <h1 className={cn(textSkeleton, "w-2/3")} />
        <h2 className={cn(textSkeleton, "w-1/3")} />
      </div>
      {/* Team skeleton */}
      <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-4 sm:grid-cols-3 sm:grid-rows-2">
        <PokeCardSkeleton />
        <PokeCardSkeleton />
        <PokeCardSkeleton />
        <PokeCardSkeleton />
        <PokeCardSkeleton />
        <PokeCardSkeleton />
      </div>
      {/* Description Skeleton */}
      <p className={cn(textSkeleton, "w-2/3")} />
      <p className={cn(textSkeleton, "w-1/2")} />
      <p className={cn(textSkeleton, "w-1/3")} />
    </>
  );
}
