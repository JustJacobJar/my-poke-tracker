"use client";

import PokeCardInput from "@/components/Cards/PokeCardInput";
import { IPokeTeam } from "@/lib/types";
import { FormEvent } from "react";

export default function EditTeamFormPage({ team }: { team: IPokeTeam }) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {}

  return (
    <>
      <form onSubmit={onSubmit} className="grid w-fit grid-cols-3 gap-4">
        {team.pokemon.map((slot, index) => {
          return (
            <PokeCardInput
              key={index}
              inputId={`slot${index}`}
              editValue={team.pokemon[index]}
            />
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
