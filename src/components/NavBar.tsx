import Link from "next/link";
import { JSX } from "react";
import ProfileNav from "./ProfileNav";

export default function NavBar() {
  return (
    <div className="bg-card relative flex place-content-center place-items-center px-8 outline">
      <div className="fixed start-8 shrink justify-self-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
          <path d="m3.3 7 8.7 5 8.7-5"></path>
          <path d="M12 22V12"></path>
        </svg>
      </div>
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
        <NavLink link="/dashboard/collections" content={<p>Collections</p>} />
      </nav>
      <div className="fixed end-8 z-50 justify-self-end">
        <ProfileNav />
      </div>
    </div>
  );
}

export function NavLink({
  content,
  link,
  classname,
}: {
  content: JSX.Element;
  link: string;
  classname?: string;
}) {
  return (
    <Link className={classname} href={link}>
      {content}
    </Link>
  );
}
