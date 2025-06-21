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
      name: formData.get("name") as string,
      pokemon: [
        formData.get("slot0") as string,
        formData.get("slot1") as string,
        formData.get("slot2") as string,
        formData.get("slot3") as string,
        formData.get("slot4") as string,
        formData.get("slot5") as string,
      ],
      description: formData.get("description") as string,
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
    <form
      onSubmit={onSubmit}
      className="flex w-11/12 max-w-4xl flex-col place-content-center gap-4 justify-self-center p-4 xl:w-2/3 2xl:w-1/2"
    >
      <div className="flex flex-row place-items-center gap-2">
        <svg
          className="stroke-foreground"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 6.1H3"></path>
          <path d="M21 12.1H3"></path>
          <path d="M15.1 18H3"></path>
        </svg>
        <input
          className="w-3/4 rounded-lg border-2 p-1 text-lg md:w-1/2"
          placeholder="Team Name"
          type="text"
          name="name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{inputs()}</div>
      <textarea
        name="description"
        className="min-h-24 rounded-lg border-2 px-2"
        placeholder={"Some description"}
      />
      <div className="flex flex-row place-content-end gap-2">
        <p aria-live="polite">{formState.message}</p>
        <SubmitButton text="submit" className="bg-primary text-primary-foreground" />
      </div>
    </form>
  );
}
