"use server";

import { auth } from "@/lib/auth";
import CollectionPage from "./collectionsPage";

export default async function CollectionServerPage() {
  const session = await auth();

  if (!session) return <p>Not logged in</p>;
  if (!session.user?.id) return <p>Cant find user Id</p>;

  return <CollectionPage authorId={session.user.id} />;
}
