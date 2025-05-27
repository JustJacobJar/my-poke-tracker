"use client";

import { cn } from "@/lib/utils";
import { textSkeleton } from "../Skeleton";

export function PokeCardSkeleton() {
  return (
    <div className="bg-card flex aspect-[3/4] w-64 flex-col place-content-around place-items-center gap-2 rounded-xl border-1 p-4 drop-shadow-sm">
      <div className="bg-muted/50 aspect-square h-fit w-full animate-pulse rounded-2xl" />
      <div className="flex w-full place-content-evenly">
        <label className={cn(textSkeleton, "w-1/3")}></label>
        <label className={cn(textSkeleton, "w-1/3")}></label>
      </div>
      <label className={cn(textSkeleton, "w-2/3")}></label>
    </div>
  );
}

export function PokeCardEmpty() {
  function handleButtonClick() {
    console.log("Gaming");
  }

  return (
    <button
      onClick={handleButtonClick}
      className="group flex aspect-[3/4] w-64 flex-col place-content-around place-items-center gap-2 rounded-xl border-4 border-dashed p-4"
    >
      <svg
        className="stroke-border group-hover:stroke-secondary w-1/3 transition-colors duration-150"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle strokeDasharray={"5"} cx="12" cy="12" r="10"></circle>
        <path d="M8 12h8"></path>
        <path d="M12 8v8"></path>
      </svg>
    </button>
  );
}
