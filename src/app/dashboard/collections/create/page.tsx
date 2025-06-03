"use client";

import PokeCardInput from "@/components/Cards/PokeCardInput";
import { IPokeTeam } from "@/lib/types";
import { FormEvent } from "react";

export default function CreateTeam() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    // "use server";

    //validation
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const rawFormData = {
      name: "DefaultName",
      // name: formData.get("name"),
      pokemon: [
        formData.get("slot0"),
        formData.get("slot1"),
        formData.get("slot2"),
        formData.get("slot3"),
        formData.get("slot4"),
        formData.get("slot5"),
      ],
      description: "Some description",
      // description: formData.get("description"),
    };

    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(rawFormData as IPokeTeam),
    });

    //Handle response and that
    const data = await response.json();
    console.log(data);
  }

  const inputs = () => {
    const pokeInput = [];
    for (let index = 0; index < 6; index++) {
      pokeInput.push(<PokeCardInput key={index} inputId={`slot${index}`} />);
    }
    return pokeInput;
  };

  return (
    <>
      <form onSubmit={onSubmit} className="grid w-fit grid-cols-3 gap-4">
        {inputs()}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
