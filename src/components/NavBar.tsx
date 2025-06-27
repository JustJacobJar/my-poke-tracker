"use client";
import ProfileNav from "./ProfileNav";
import ThemeToggle from "./ThemeToggle";
import { NavLink } from "./NavLink";
import Link from "next/link";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="bg-card/90 relative flex place-content-center place-items-center px-8 drop-shadow-sm backdrop-blur-xl">
      {/* Logo */}
      <Link
        className="stroke-foreground fixed start-8 shrink justify-self-start"
        href={"/"}
      >
        <Logo />
      </Link>
      {/* Center Nav */}
      <nav className="flex h-16 w-full flex-row place-content-evenly place-items-center xl:w-3/5">
        <NavLink link="/dashboard" content={<p>Dashboard</p>} />
        <NavLink
          link="/dashboard/collections/create"
          content={
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
              <rect
                strokeDasharray={3}
                width="18"
                height="18"
                x="3"
                y="3"
                rx="4"
              ></rect>
              <path d="M8 12h8"></path>
              <path d="M12 8v8"></path>
            </svg>
          }
        />
        <NavLink
          link={`/dashboard/collections/`}
          content={<p>Collections</p>}
        />
      </nav>
      {/* Theme/Profile */}
      <div className="fixed end-8 z-50 flex place-items-center gap-4 justify-self-end">
        <ThemeToggle />
        <ProfileNav />
      </div>
    </div>
  );
}
