"use server";

import SignIn from "@/components/SignIn";
import { auth } from "@/lib/auth";

export default async function CollectionPage() {
  const session = await auth();

  const loggedIn = () => {
    if (!session) {
      return (
        <div>
          <p>Not logged in, please log in</p>
          <SignIn />
          {/* Redirect to login page */}
        </div>
      );
    }
    return (
      <div>
        This is where all of your teams would be shown with a little edit icon
        in case you want to change them
      </div>
    );
  };

  return (
    <>
      <div>{loggedIn()}</div>
    </>
  );
}
