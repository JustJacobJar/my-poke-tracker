"use client";

import Link from "next/link";
import { ReactNode } from "react";

export function NavLink({
  content,
  link,
  classname,
}: {
  content: ReactNode;
  link: string;
  classname?: string;
}) {
  return (
    <Link className={classname} href={link}>
      {content}
    </Link>
  );
}
