import { Suspense } from "react";
import { PokeCard } from "./PokeCards";
import { PokeCardEmpty, PokeCardSkeleton } from "./PokeCardsSkeleton";
import { IPokeTeam } from "@/lib/types";

export default function PokeTeam({ pokeTeam }: { pokeTeam: IPokeTeam }) {
  /*
    Takes in data to fill in the 6 slots.
    Either empty or filled
    Filled fallback to loading skeleton    

    read the pokemon
    if there is pokemon, placeholder with name
      hydrate with api data later
    if not, empty card

    OK SO
    this needs to be a client side?
    it should get passed the data without having to fetch the data.
    the data is fetched above then passed here
  */

  const pokemon = (team: IPokeTeam) => {
    const elements = [];
    for (let index = 0; index < 6; index++) {
      if (team.Pokemon[index] != null) {
        elements.push(
          <Suspense key={index} fallback={<PokeCardSkeleton key={index} />}>
            <PokeCard name={team.Pokemon[index]} key={index} />
          </Suspense>,
        );
      } else {
        elements.push(<PokeCardEmpty key={index} />);
      }
    }
    return elements;
  };

  return (
    <div>
      <div>
        <a href={"/team/" + pokeTeam.id}>Team Name</a>
      </div>
      <div className="grid w-fit grid-cols-3 gap-4">{pokemon(pokeTeam)}</div>
    </div>
  );
}
