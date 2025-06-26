"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { LoadingSpinner } from "./LoadingSpinner";
import { useDeleteTeamMutate } from "@/lib/queries";

export default function DeleteButtonModal({
  teamId,
  redirect = false,
}: {
  teamId: string;
  redirect?: boolean;
}) {
  const [open, setOpen] = useState(false); //modal open close
  const [mutation] = useDeleteTeamMutate();

  async function onDelete() {
    mutation.mutate({ teamId: teamId, redir: redirect });
  }

  useEffect(() => {
    if (mutation.isSuccess) setOpen(false);
  }, [mutation.isSuccess]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-destructive stroke-destructive-foreground aspect-square place-self-center p-2"
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
        cancelFn={() => setOpen(mutation.isPending)}
        titleContent={<h1>Delete Team?</h1>}
        content={
          <>
            {mutation.isPending && <LoadingSpinner />}
            <p>Are you sure you want to delete this team?</p>
          </>
        }
        buttons={
          <>
            {" "}
            <button
              disabled={mutation.isPending}
              className="bg-background hover:bg-secondary text-secondary-foreground border"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              disabled={mutation.isPending}
              className="bg-destructive text-destructive-foreground"
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
