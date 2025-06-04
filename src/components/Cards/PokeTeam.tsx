import { PokeCard } from "./PokeCards";
import { PokeCardEmpty } from "./PokeCardsSkeleton";
import { IPokeTeam } from "@/lib/types";

export default function PokeTeam({ pokeTeam }: { pokeTeam: IPokeTeam }) {
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
    <div className="grid w-fit grid-cols-3 gap-4">{pokemon(pokeTeam)}</div>
  );
}
