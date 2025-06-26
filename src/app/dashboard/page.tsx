"use client";
import PokeTeamMinimal from "@/components/Teams/PokeTeamMinimal";
import Feed from "@/components/Feed";
import { useTeamsQuery } from "@/lib/queries";
import { Fragment } from "react";
import Link from "next/link";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Dashboard() {
  const [
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  ] = useTeamsQuery();

  return status === "pending" ? (
    <LoadingSpinner />
  ) : status === "error" ? (
    <p className="justify-center text-center">
      There was an error: {error?.message}. Please try again later
    </p>
  ) : (
    <Feed
      dataLength={data?.pages.length as number}
      next={() => fetchNextPage()}
      hasMore={hasNextPage}
    >
      {data?.pages.map((group, index) => {
        return (
          <Fragment key={index}>
            {group.data.map((team, i) => (
              <Link
                className="bg-card flex h-full grow flex-col rounded-2xl border-2 p-2"
                href={`/dashboard/team/${team.id}`}
                key={i}
              >
                <h1 className="px-2 pb-2 text-lg">
                  {team.name ? team.name : "No team name"}
                </h1>
                <PokeTeamMinimal pokeTeam={team} />
              </Link>
            ))}
          </Fragment>
        );
      })}
    </Feed>
  );
}
