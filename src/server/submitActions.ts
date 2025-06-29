"use server";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";
import { prisma } from "@/prisma";
import { IPokeTeam } from "@/lib/types";

export async function CreateTeam(teamData: IPokeTeam) {
  //Auth the user
  const session = await auth();
  if (!session?.user?.id) throw "Error getting user data";

  //Capture and validate data
  const validated = await IPokeTeamZ.safeParseAsync(teamData);
  if (!validated.success) throw validated.error.message;

  //Upload to database
  try {
    const team = await prisma.pokemonTeam.create({
      data: {
        pokemon: validated.data.pokemon,
        authorId: session.user.id,
        description: validated.data.description,
        name: validated.data.name,
        updatedAt: new Date(),
      },
    });
    // revalidatePath("/dashboard");
    return team;
  } catch (error) {
    throw "There was an error saving to the database: " + error;
  }
}

export async function EditTeam(teamData: IPokeTeam) {
  //Auth user
  const session = await auth();
  if (!session?.user?.id) throw "401: Unauthorised, please sign in";

  //Capture and vaidate data
  const validated = await IPokeTeamZ.safeParseAsync(teamData);
  if (!validated.success) throw validated.error.message;

  //check the posts author id and validate this session matches
  const team = await prisma.pokemonTeam.findUnique({
    where: { id: validated.data.id },
  });

  //Entry does not exist
  if (!team) throw "Team not found! " + validated.data.id;

  //User is not the owner of the team, cant edit
  if (team.authorId !== session.user.id)
    throw "401: Unauthorised, you do not own this team. " + validated.data.id;

  //Edit the team
  try {
    const updatedTeam = await prisma.pokemonTeam.update({
      where: { id: validated.data.id },
      data: {
        name: validated.data.name,
        pokemon: validated.data.pokemon,
        description: validated.data.description,
        updatedAt: new Date(),
      },
    });
    // revalidatePath(`/team/${team.id}`);
    return updatedTeam;
  } catch (error) {
    console.log("Db error: " + error);
    throw "There was an error updating the database, try again later.";
  }
}

export async function DeleteTeam(teamId: string, redir: boolean) {
  //Auth user
  const session = await auth();
  if (!session?.user?.id) throw "401: Unauthorised, please sign in";

  //Find the team
  const team = await prisma.pokemonTeam.findUnique({
    where: { id: teamId },
  });

  //Team not found
  if (!team) throw "404: Team not found!";

  //Check the user owns the team -> delete
  if (team.authorId !== session.user.id)
    throw "401: Unauthorised, you are not the team owner";

  try {
    await prisma.pokemonTeam.delete({ where: { id: teamId } });
    if (redir) {
      return { redir: true, teamId: teamId };
    } else {
      return { redir: false, teamId: teamId };
    }
  } catch (error) {
    console.log("Db error: " + error);
    throw "There was an error deleting from the database, try again later.";
  }
}

export async function ChangeDisplayName(userId: string, name: string) {
  //Auth user
  const session = await auth();
  if (!session?.user?.id) throw "401: Unauthorised, please sign in";

  //Find the user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw "404 User not found";

  //Update name
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
      },
    });
    return user;
  } catch (error) {
    console.log("Db error: " + error);
    throw "There was an error with the database, try again later.";
  }
}

export async function DeleteUser(userId: string) {
  //Auth user
  const session = await auth();
  if (!session?.user?.id) throw "401: Unauthorised, please sign in";

  //Find the user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw "404 User not found";

  //Make sure the user is deleting their own account
  if (session.user.id !== userId)
    throw "401 Unauthorised, you can only delete your own account";

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return;
  } catch (error) {
    console.log("DB error:" + error);
    throw "There was an error with the database, try again later";
  }
}

const IPokeTeamZ = z.object({
  name: z.string(),
  pokemon: z.array(z.string().catch("")),
  description: z.string(),
  id: z.string().optional(),
});
