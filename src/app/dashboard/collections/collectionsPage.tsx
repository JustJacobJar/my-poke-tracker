"use client";

import Feed from "@/components/Feed";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import PokeTeamStandard from "@/components/Teams/PokeTeamStandard";
import { useTeamsByAuthorQuery } from "@/lib/queries";
import { Fragment } from "react";

export default function CollectionPage({ authorId }: { authorId: string }) {
  const [
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  ] = useTeamsByAuthorQuery(authorId);

  const teams = () => {
    if (data?.pages.length == 0) {
      return <div>You have no teams yet...</div>;
    }
    return (
      <Feed
        dataLength={data?.pages.length as number}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
      >
        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group.data.map((team, i) => (
                <div
                  className="bg-card flex h-full w-full flex-col rounded-2xl border-2 px-2"
                  key={i}
                >
                  <PokeTeamStandard pokeTeam={team} />
                </div>
              ))}
            </Fragment>
          );
        })}
      </Feed>
    );
  };

  return status === "pending" ? (
    <LoadingSpinner />
  ) : status === "error" ? (
    <p className="justify-center text-center">
      There was an error: {error?.message}. Please try again later
    </p>
  ) : (
    <div className="flex w-full flex-col place-items-center place-self-center">
      <h1 className="py-8 text-4xl font-bold">Your Teams</h1>
      {teams()}
    </div>
  );
}
