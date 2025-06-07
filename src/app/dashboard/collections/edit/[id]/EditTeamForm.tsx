"use client";

import PokeCardInput from "@/components/Cards/PokeCardInput";
import { FormEvent, useState } from "react";
import { PokemonTeam } from "../../../../../../generated/prisma";
import Modal from "@/components/Modal";

export default function EditTeamFormPage({ team }: { team: PokemonTeam }) {
  const [open, setOpen] = useState(false); //modal open close

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //Check that the data is actually getting changed?

    const formData = new FormData(event.currentTarget);

    const rawFormData = {
      id: team.id,
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
      method: "PATCH",
      body: JSON.stringify(rawFormData),
    });

    const data = await response.json();
    console.log(data);
  }

  async function onDelete() {
    const response = await fetch("/api/submit", {
      method: "DELETE",
      body: JSON.stringify({ id: team.id }),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="grid w-fit grid-cols-3 gap-4 outline"
      >
        {team.pokemon.map((slot, index) => {
          return (
            <PokeCardInput
              key={index}
              inputId={`slot${index}`}
              editValue={slot}
            />
          );
        })}
        <div className="col-span-3 flex w-full flex-row place-content-end gap-8 p-2 outline">
          <button type="button" onClick={() => setOpen(true)}>
            Delete
          </button>
          <button type="submit">Submit</button>
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
              className="rounded-lg bg-neutral-300 p-2 hover:brightness-110"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-destructive rounded-lg p-2 text-white hover:brightness-110"
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
