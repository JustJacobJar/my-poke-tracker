"use client";
import PokeTeamMinimal from "@/components/Teams/PokeTeamMinimal";
import Feed from "@/components/Feed";
import { useTeamsQuery } from "@/lib/queries";
import { Fragment, useState } from "react";

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
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
    <>
      {/* <div className="grid w-full grid-cols-1 flex-wrap place-items-center gap-4 place-self-center p-4 md:grid-cols-2 2xl:grid-cols-3 2xl:w-[96rem]"> */}
      <Feed>
        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group.data.map((team) => (
                <a
                  className="bg-card flex h-full grow flex-col rounded-2xl border-2 p-2"
                  href={`/dashboard/team/${team.id}`}
                  key={index}
                >
                  <h1 className="px-2 pb-2 text-lg">
                    {team.name ? team.name : "No team name"}
                  </h1>
                  <PokeTeamMinimal pokeTeam={team} />
                </a>
              ))}
            </Fragment>
          );
        })}
      </Feed>
      {hasNextPage ? (
        <button onClick={() => fetchNextPage()}>Load More</button>
      ) : (
        <p>No more teams</p>
      )}
      {/* </div> */}
    </>
  );
}
