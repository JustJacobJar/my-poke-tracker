"use client";

import PokeCardInput from "@/components/Cards/PokeCardInput";
import { FormEvent, startTransition, useActionState } from "react";
import { PokemonTeam } from "../../../../../../generated/prisma";
import { EditTeam } from "@/app/server/submitActions";
import { FormState } from "@/lib/types";
import SubmitButton from "@/components/SubmitButton";
import DeleteButtonModal from "@/components/DeleteButtonModal";

export default function EditTeamFormPage({ team }: { team: PokemonTeam }) {
  const [editFormState, editFormAction] = useActionState(
    EditTeam,
    {} as FormState,
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    //Validation
    event.preventDefault();

    //Check that the data is actually getting changed?

    //Format data
    const formData = new FormData(event.currentTarget);
    const rawFormData = {
      id: team.id,
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

    startTransition(() => editFormAction(rawFormData));
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
        {/* Title */}
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
            defaultValue={team.name}
            type="text"
            name="name"
          />
        </div>
        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {team.pokemon.map((slot, index) => {
            return (
              <PokeCardInput
                key={index}
                inputId={`slot${index}`}
                editValue={slot}
              />
            );
          })}
        </div>
        {/* Description */}
        <textarea
          name="description"
          className="min-h-24 rounded-lg border-2 px-2"
          defaultValue={team.description}
          placeholder={"Some description"}
        />
        {/* Buttons */}
        <div className="flex w-full flex-row place-content-end gap-4 p-2">
          <p aria-live="polite">{editFormState.message}</p>

          <DeleteButtonModal teamId={team.id} redirect={true} />
          <SubmitButton
            className="bg-primary text-primary-foreground"
            text="Submit"
          />
        </div>
      </form>
    </>
  );
}
