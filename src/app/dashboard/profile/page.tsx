"use server";

import { auth } from "@/lib/auth";
import ProfileForm from "./profileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  if (!session.user) {
    return <div>No Profile Data</div>;
  }
  session.user.name = "Gaming";

  return (
    <>
      <ProfileForm />
    </>
  );
}
