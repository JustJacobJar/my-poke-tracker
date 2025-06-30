"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, MenuItem } from "./Menu";
import { useState } from "react";
import Link from "next/link";

export default function ProfileNav() {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);

  if (status !== "authenticated") {
    //return not logged in type
    return (
      <button
        onClick={() => signIn()}
        className="ring-primary border-foreground flex w-fit flex-row place-items-center gap-2 rounded-full border-2 p-0 px-1 align-middle transition-all duration-150 hover:ring-4"
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
        className="stroke-foreground ring-ring rounded-full fill-none p-0 align-middle transition-all duration-150 hover:ring-4"
      >
        {session.user?.image ? (
          <img
            className="size-10 rounded-full"
            alt={"Profile Picture"}
            width="40px"
            height="40px"
            src={session.user?.image}
          />
        ) : (
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
        )}
      </button>
      {/* Menu */}
      <Menu open={open} closeFn={() => setOpen(false)}>
        <Link
          className="flex h-12 flex-row place-items-center gap-2 rounded-lg px-2 py-1 transition-all duration-150 hover:inset-ring-1 hover:brightness-75 disabled:brightness-50"
          href={"/dashboard/profile"}
        >
          {session.user?.image ? (
            <img
              className="size-10 rounded-full"
              alt={"Profile Picture"}
              width="40px"
              height="40px"
              src={session.user.image}
            />
          ) : (
            <svg
              className="stroke-foreground fill-none"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="10" r="4"></circle>
              <path d="M18 20a6 6 0 0 0-12 0"></path>
            </svg>
          )}
          <div className="line-clamp-1 pl-1 overflow-ellipsis">
            {session.user?.name ? session.user.name : "Profile"}
          </div>
        </Link>
        {/* <MenuItem
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
        /> */}
        <MenuItem
          icon={
            <svg
              className="stroke-foreground"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
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
