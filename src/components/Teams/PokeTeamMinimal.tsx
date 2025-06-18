import { PokeCard } from "../Cards/PokeCards";
import { PokeCardEmpty } from "../Cards/PokeCardsSkeleton";
import { IPokeTeam } from "@/lib/types";

export default function PokeTeamMinimal({ pokeTeam }: { pokeTeam: IPokeTeam }) {
  const pokemon = (team: IPokeTeam) => {
    const elements = [];
    for (let index = 0; index < 6; index++) {
      if (team.pokemon[index] != null && team.pokemon[index] !== "") {
        elements.push(<PokeCard name={team.pokemon[index]} key={index} />);
      } else {
        elements.push(<PokeCardEmpty key={index} />);
      }
    }
    return elements;
  };

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2">
      {pokemon(pokeTeam)}
    </div>
  );
}
