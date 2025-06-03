"use client";
import { useState } from "react";
import Autocomplete from "../Autocomplete";

export default function PokeCardInput({ inputId }: { inputId: string }) {
  // const [poke, setPoke] = useState("");
  const [edit, setEdit] = useState(false);

  const toggleEdit = (toggle: boolean) => {
    setEdit(toggle);
  };

  const inputField = () => {
    if (!edit) {
      //return the button to turn on edit mode
      return (
        <button
          className="stroke-border hover:stroke-secondary w-1/2 transition-colors duration-150"
          onMouseDown={() => {
            toggleEdit(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle strokeDasharray={3} cx="12" cy="12" r="10"></circle>
            <path d="M8 12h8"></path>
            <path d="M12 8v8"></path>
          </svg>
        </button>
      );
    }
    //return the input field to edit
    return (
      <div className="relative size-full place-content-center">
        <button
          onMouseDown={() => toggleEdit(false)}
          className="stroke-border hover:stroke-destructive absolute top-0 right-0 w-16 transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle strokeDasharray={3} cx="12" cy="12" r="10"></circle>
            <path d="M8 12h8"></path>
            <path d="M12 8v8"></path>
          </svg>
        </button>
        <Autocomplete classname="z-10" slotName={inputId} />
      </div>
    );
  };

  return (
    <div className="flex aspect-[3/4] w-64 flex-col place-content-around place-items-center rounded-xl border-4 border-dashed">
      {inputField()}
    </div>
  );
}
