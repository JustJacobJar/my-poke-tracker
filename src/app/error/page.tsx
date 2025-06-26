"use server";
import Link from "next/link";

export default async function ErrorPage() {
  return (
    <div className="bg-background text-foreground flex h-dvh flex-col place-content-center place-items-center gap-4 text-center">
      <h1 className="text-4xl font-bold">There was an error!</h1>
      <Link className="text-primary text-lg underline" href={"/dashboard"}>
        Go back to dashboard
      </Link>
    </div>
  );
}
