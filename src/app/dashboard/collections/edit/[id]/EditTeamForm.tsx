"use client";

import PokeCardInput from "@/components/Cards/PokeCardInput";
import { FormEvent, startTransition, useActionState, useState } from "react";
import { PokemonTeam } from "../../../../../../generated/prisma";
import Modal from "@/components/Modal";
import { DeleteTeam, EditTeam } from "@/app/server/submitActions";
import { FormState } from "@/lib/types";
import SubmitButton from "@/components/SubmitButton";
import { useFormStatus } from "react-dom";

export default function EditTeamFormPage({ team }: { team: PokemonTeam }) {
  const [editFormState, editFormAction] = useActionState(
    EditTeam,
    {} as FormState,
  );
  const [deleteFormState, deleteFormAction] = useActionState(
    DeleteTeam,
    {} as FormState,
  );
  const { pending } = useFormStatus();
  const [open, setOpen] = useState(false); //modal open close

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    //Validation
    event.preventDefault();

    //Check that the data is actually getting changed?

    //Format data
    const formData = new FormData(event.currentTarget);
    const rawFormData = {
      id: team.id,
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

    startTransition(() => editFormAction(rawFormData));
  }

  async function onDelete() {
    startTransition(() => deleteFormAction(team.id));
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex w-full flex-col">
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
        {/* Buttons */}
        <div className="flex w-full flex-row place-content-end gap-4 p-2">
          <p aria-live="polite">
            {deleteFormState.message && editFormState.message}
          </p>

          <button
            className="bg-destructive text-background"
            type="button"
            onClick={() => setOpen(true)}
          >
            Delete
          </button>
          <SubmitButton
            className="bg-primary text-background rounded-md p-2 px-4 transition-all duration-150 hover:brightness-125 disabled:brightness-50"
            text="Submit"
          />
        </div>
      </form>
      <Modal
        open={open}
        cancelFn={() => setOpen(false)}
        titleContent={<h1>Delete Team?</h1>}
        content={<p>Are you sure you want to delete this team?</p>}
        buttons={
          <>
            {" "}
            <button
              className="rounded-lg bg-neutral-300 hover:brightness-110"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              disabled={pending}
              className="bg-destructive rounded-lg text-white hover:brightness-110"
              onClick={onDelete}
            >
              Confirm
            </button>
          </>
        }
      />
    </>
  );
}
