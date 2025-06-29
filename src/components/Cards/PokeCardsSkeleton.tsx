"use client";

import { cn } from "@/lib/utils";
import { textSkeleton } from "../Skeleton";

export function PokeCardSkeleton() {
  return (
    <div className="bg-card flex aspect-[9/13] h-full min-w-44 grow flex-col place-content-around place-items-center gap-2 rounded-xl border-1 p-4 drop-shadow-sm">
      <label className={cn(textSkeleton, "w-2/3")}></label>
      <div className="bg-muted/50 aspect-square h-fit w-full animate-pulse rounded-2xl" />
      <div className="flex w-full place-content-evenly">
        <label className={cn(textSkeleton, "w-2/5")}></label>
        <label className={cn(textSkeleton, "w-2/5")}></label>
      </div>
    </div>
  );
}

export function PokeCardEmpty() {
  return (
    <div className="flex aspect-[9/13] h-full min-w-44 grow flex-col place-content-around place-items-center rounded-xl border-4 border-dashed"></div>
  );
}

export function PokeCardError() {
  return (
    <div className="flex aspect-[9/13] h-full min-w-44 grow flex-col place-content-around place-items-center rounded-xl border-4 border-dashed">
      404 Not Found
    </div>
  );
}
