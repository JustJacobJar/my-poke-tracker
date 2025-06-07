"use server";

import { prisma } from "@/app/prisma";
import SignIn from "@/components/SignIn";
import PokeTeamStandard from "@/components/Teams/PokeTeamStandard";
import { auth } from "@/lib/auth";

export default async function CollectionPage() {
  const session = await auth();
  const myCollections = await prisma.pokemonTeam.findMany({
    where: { authorId: session?.user?.id },
  }); //pagenate this

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
      <h1>My Teams</h1>
      <div className="flex flex-col place-items-center gap-4">
        {myCollections.map((data, index) => {
          return <PokeTeamStandard pokeTeam={data} key={index} />;
        })}
      </div>
    </>
  );
}
