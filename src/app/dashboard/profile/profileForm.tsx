"use client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Modal from "@/components/Modal";
import { useDeleteUserMutate, useEditDisplayNameMutate } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfileForm() {
  const { data, status, update } = useSession();
  const [displayName, setDisplayName] = useState(data?.user?.name as string);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false); //Modal
  const [open, setOpen] = useState(false); //Alert Popup
  const [openErr, setOpenErr] = useState(false); //Alert Popup Error

  const [mutate] = useEditDisplayNameMutate();
  const [deleteMutate] = useDeleteUserMutate();

  useEffect(() => {
    if (mutate.isSuccess) {
      update({ name: displayName });
      return setOpen(true);
    }
    if (mutate.isError) {
      update({ name: displayName });
      return setOpenErr(true);
    }
    if (mutate.status === "idle") {
      setOpen(false);
      return setOpenErr(false);
    }
  }, [mutate.status]);

  useEffect(() => {
    if (deleteMutate.status === "idle") return;
    if (deleteMutate.isSuccess) {
      signOut();
    }
  }, [deleteMutate.status]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated") {
    return <p>Unable to log in</p>;
  }

  const handleInput = (e: string) => {
    if (e === "") {
      setError(true);
    }

    if (error && e !== "") {
      setError(false);
    }

    if (e.length > 32) {
      return;
    }
    setDisplayName(e);
  };

  function handleFormSubmit() {
    if (displayName === "" || displayName === undefined) return;
    if (displayName === (data?.user?.name as string)) return;
    mutate.mutate({ userId: data?.user?.id as string, name: displayName });
  }

  function handleDeleteAccount() {
    if (!data?.user?.id) return;
    deleteMutate.mutate({ userId: data.user.id });
  }

  return (
    <>
      <form
        action={() => handleFormSubmit()}
        className="bg-card mt-20 flex h-80 w-full max-w-xl flex-col gap-8 place-self-center rounded-2xl border-2 p-8"
      >
        <h1 className="text-center text-2xl">Profile Details</h1>
        <div className="flex h-full flex-col place-content-between">
          <div className="flex w-72 flex-col gap-2 self-center">
            <label>Display Name</label>
            <div className="flex flex-col">
              <input
                className={cn(
                  error ? "ring-destructive ring-2" : "",
                  "bg-input text-foreground rounded-md p-2",
                )}
                defaultValue={data?.user?.name as string}
                value={displayName}
                onChange={(e) => handleInput(e.currentTarget.value)}
              ></input>
              <label className="text-destructive" hidden={!error}>
                Required
              </label>
            </div>
          </div>
          <div className="flex w-full flex-row justify-end gap-4">
            <button
              className="bg-destructive text-destructive-foreground flex flex-row gap-2"
              type="button"
              onClick={() => setOpenModal(true)}
            >
              <svg
                className="stroke-foreground p-0.5"
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
              <label>Delete Account</label>
            </button>
            <button
              className="bg-primary text-primary-foreground"
              type="submit"
              disabled={mutate.isPaused}
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {/* Delete Modal */}
      <Modal
        open={openModal}
        cancelFn={() => setOpenModal(false)}
        titleContent={<h1>Delete account?</h1>}
        content={
          <div>
            Are you sure you want to delete your account? <br />
            This will also delete all of your teams.
          </div>
        }
        buttons={[
          <button
            disabled={deleteMutate.isPending}
            className="bg-destructive text-destructive-foreground"
            key={0}
            onClick={() => handleDeleteAccount()}
          >
            Confirm
          </button>,
          <button
            disabled={deleteMutate.isPending}
            className="bg-muted text-muted-foreground"
            onClick={() => setOpenModal(false)}
            key={1}
          >
            Cancel
          </button>,
        ]}
      />
      {/* Alert Pass */}
      {open && (
        <div className="absolute top-16 left-1/2 flex h-16 w-96 -translate-x-1/2 flex-row rounded-full bg-green-700/75 p-2 text-center text-white">
          <label className="w-full self-center">Successfully update name</label>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="size-fit self-center stroke-white p-0"
          >
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
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      )}
      {/* Alert Error */}
      {openErr && (
        <div className="bg-destructive/75 text-destructive-foreground absolute top-16 left-1/2 flex h-16 w-96 -translate-x-1/2 flex-row rounded-full p-2 text-center">
          <label className="w-full self-center">
            There was an error, try again later
          </label>
          <button
            type="button"
            onClick={() => setOpenErr(false)}
            className="size-fit self-center stroke-white p-0"
          >
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
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
