"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, MenuItem } from "./Menu";
import { useState } from "react";

export default function ProfileNav() {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);

  if (status !== "authenticated") {
    //return not logged in type
    return (
      <button
        onClick={() => signIn()}
        className="ring-primary w-fit flex flex-row place-items-center gap-2 rounded-full border-2 border-black p-0 px-1 align-middle transition-all duration-150 hover:ring-4"
      >
        <svg
          className="stroke-foreground ring-primary rounded-full fill-none"
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="10" r="4"></circle>
          <path d="M18 20a6 6 0 0 0-12 0"></path>
        </svg>
        <div className="text-nowrap">Sign In</div>
      </button>
    );
  }

  return (
    <div className="relative z-50">
      {/* Icon */}
      <button
        onClick={() => setOpen(true)}
        className="stroke-foreground p-0 ring-ring rounded-full fill-none align-middle transition-all duration-150 hover:ring-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="10" r="4"></circle>
          <path d="M18 20a6 6 0 0 0-12 0"></path>
        </svg>
      </button>
      {/* Menu */}
      <Menu open={open} closeFn={() => setOpen(false)}>
        <div>{session.user?.name}</div>
        <MenuItem
          icon={
            <svg
              className="stroke-foreground fill-none"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="10" r="4"></circle>
              <path d="M18 20a6 6 0 0 0-12 0"></path>
            </svg>
          }
          content={<div>Profile</div>}
          fn={() => console.log("Profile Clicked")}
        />
        <MenuItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
          }
          content={<div>Sign Out</div>}
          fn={() => signOut()}
        />
      </Menu>
    </div>
  );
}
