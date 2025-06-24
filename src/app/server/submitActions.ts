"use server";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";
import { prisma } from "@/app/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormState, IPokeTeam } from "@/lib/types";

export async function CreateTeam(initialState: any, teamData: IPokeTeam) {
  //Auth the user
  const session = await auth();
  if (!session?.user?.id)
    return {
      message: "Error getting user data",
      success: false,
    } as FormState;

  //Capture and validate data
  const validated = await IPokeTeamZ.safeParseAsync(teamData);
  if (!validated.success) {
    return {
      message: validated.error.message,
      success: false,
    } as FormState;
  }

  let teamId = "";
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
    teamId = team.id;
  } catch (error) {
    return {
      message: "There was an error saving to the database: " + error,
      success: false,
    } as FormState;
  }

  //Success, redirect user to the created team
  revalidatePath("/dashboard");
  redirect(`/dashboard/team/${teamId}`);
}

export async function EditTeam(initialState: any, teamData: IPokeTeam) {
  //Auth user
  const session = await auth();
  if (!session?.user?.id)
    return {
      message: "401: Unauthorised, please sign in",
      success: false,
    } as FormState;

  //Capture and vaidate data
  const validated = await IPokeTeamZ.safeParseAsync(teamData);
  if (!validated.success) {
    return {
      message: validated.error.message,
      success: false,
    } as FormState;
  }

  //check the posts author id and validate this session matches
  const team = await prisma.pokemonTeam.findUnique({
    where: { id: validated.data.id },
  });

  //Entry does not exist
  if (!team)
    return {
      message: "Team not found! " + validated.data.id,
      success: false,
    } as FormState;

  //User is not the owner of the team, cant edit
  if (team.authorId !== session.user.id)
    return {
      message:
        "401: Unauthorised, you do not own this team. " + validated.data.id,
      success: false,
    } as FormState;

  //Edit the team
  try {
    await prisma.pokemonTeam.update({
      where: { id: validated.data.id },
      data: {
        name: validated.data.name,
        pokemon: validated.data.pokemon,
        description: validated.data.description,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.log("Db error: " + error);
    return {
      message: "There was an error updating the database, try again later.",
      success: false,
    } as FormState;
  }

  //Succesfully edited, redirect user to team
  revalidatePath("/dashboard");
  redirect(`/dashboard/team/${validated.data.id}`);
}

export async function DeleteTeam(
  initialState: any,
  teamId: string,
  redir = true,
) {
  //Auth user
  const session = await auth();
  if (!session?.user?.id)
    return {
      message: "401: Unauthorised, please sign in",
      success: false,
    } as FormState;

  //Find the team
  const team = await prisma.pokemonTeam.findUnique({
    where: { id: teamId },
  });

  //Team not found
  if (!team)
    return {
      message: "404: Team not found!",
      success: false,
    } as FormState;

  //Check the user owns the team -> delete
  if (team.authorId === session.user.id) {
    try {
      await prisma.pokemonTeam.delete({ where: { id: teamId } });
    } catch (error) {
      console.log("Db error: " + error);
      return {
        message:
          "There was an error deleting from the database, try again later.",
        success: false,
      } as FormState;
    }
  }

  //Successfully deleted
  revalidatePath("/dashboard");
  if (redir) redirect("/dashboard/collections/");
  return {
    message: `Successfully deleted team:${teamId}`,
    success: true,
  } as FormState;
}

export async function DeleteTeamNoRedirect(initialState: any, teamId: string) {
  return DeleteTeam(initialState, teamId, false);
}

const IPokeTeamZ = z.object({
  name: z.string(),
  pokemon: z.array(z.string().catch("")),
  description: z.string(),
  id: z.string().optional(),
});
