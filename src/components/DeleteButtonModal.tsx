"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Modal from "./Modal";
import { useFormStatus } from "react-dom";
import { DeleteTeam, DeleteTeamNoRedirect } from "@/app/server/submitActions";
import { FormState } from "@/lib/types";

export default function DeleteButtonModal({
  teamId,
  redirect = false,
}: {
  teamId: string;
  redirect?: boolean;
}) {
  const { pending } = useFormStatus();
  const [open, setOpen] = useState(false); //modal open close
  const [deleteFormState, deleteFormAction, isPending] = useActionState(
    redirect ? DeleteTeam : DeleteTeamNoRedirect,
    {} as FormState,
  );

  async function onDelete() {
    startTransition(() => deleteFormAction(teamId));
  }

  useEffect(() => {
    if (deleteFormState.success) setOpen(false);
  }, [deleteFormState]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-destructive stroke-foreground hover:stroke-card aspect-square place-self-center p-2"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" x2="10" y1="11" y2="17"></line>
          <line x1="14" x2="14" y1="11" y2="17"></line>
        </svg>
      </button>
      <Modal
        open={open}
        cancelFn={() => setOpen(isPending)}
        titleContent={<h1>Delete Team?</h1>}
        content={
          <>
            {isPending && <LoadingSpinner />}
            <p>Are you sure you want to delete this team?</p>
          </>
        }
        buttons={
          <>
            {" "}
            <button
              disabled={isPending}
              className="rounded-lg bg-neutral-300 hover:brightness-110"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              disabled={isPending}
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

function LoadingSpinner() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex place-content-center place-items-center bg-black/20">
      <svg
        className="stroke-border size-24 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
    </div>
  );
}
