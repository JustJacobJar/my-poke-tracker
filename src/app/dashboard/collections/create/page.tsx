"use client";

import { CreateTeam } from "@/app/server/submitActions";
import PokeCardInput from "@/components/Cards/PokeCardInput";
import SubmitButton from "@/components/SubmitButton";
import { FormState, IPokeTeam } from "@/lib/types";
import { FormEvent, startTransition, useActionState } from "react";

export default function CreateTeamPage() {
  const [formState, formAction] = useActionState(CreateTeam, {} as FormState);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    //validation
    event.preventDefault();

    //Format data
    const formData = new FormData(event.currentTarget);
    const rawFormData: IPokeTeam = {
      name: "DefaultName",
      // name: formData.get("name"),
      pokemon: [
        formData.get("slot0") as string,
        formData.get("slot1") as string,
        formData.get("slot2") as string,
        formData.get("slot3") as string,
        formData.get("slot4") as string,
        formData.get("slot5") as string,
      ],
      description: "Some description",
      // description: formData.get("description"),
    };
    startTransition(() => formAction(rawFormData));
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
        <p aria-live="polite">{formState.message}</p>
        <SubmitButton text="submit" />
      </form>
    </>
  );
}
