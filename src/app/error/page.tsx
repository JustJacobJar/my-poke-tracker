"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  return (
    <div className="bg-background text-foreground flex h-dvh flex-col place-content-center place-items-center gap-4 text-center">
      <h1 className="text-4xl font-bold">There was an error!</h1>
      <Link className="text-primary text-lg underline" href={"/dashboard"}>
        Go back to dashboard
      </Link>
      <h4 className="w-96">Error: {error}</h4>
    </div>
  );
}
