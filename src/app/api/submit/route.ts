import { z } from "zod/v4";
import { auth } from "@/lib/auth";
import { prisma } from "@/app/prisma";

export async function POST(request: Request) {
  //Auth the user
  const session = await auth();
  if (!session?.user?.id) return Response.json("Error getting user data");

  //Capture and validate data
  const data = await request.json();
  const validated = await IPokeTeamZ.safeParseAsync(data);
  if (!validated.success) {
    return Response.json(validated.error.message);
  }

  try {
    await prisma.pokemonTeam.create({
      data: {
        pokemon: validated.data.pokemon,
        authorId: session.user.id,
        description: validated.data.description,
        name: validated.data.name,
      },
    });
  } catch (error) {
    return Response.json("There was an error saving to the database: " + error);
  }

  //Redirect user
  return Response.json("Created Success");
}

export async function PATCH(request: Request) {
  //Auth user
  const session = await auth();
  if (!session?.user?.id) return Response.json("401: Unauthorised");

  //Capture and vaidate data
  const data = await request.json();
  const validated = await IPokeTeamZ.safeParseAsync(data);
  if (!validated.success) {
    return Response.json(validated.error.message);
  }

  //check the posts author id and validate this session matches
  const team = await prisma.pokemonTeam.findUnique({
    where: { id: validated.data.id },
  });

  //Entry does not exist
  if (!team) return Response.json("Team not found!" + validated.data.id);

  if (team.authorId === session.user.id) {
    //User is allowed to edit their own teams
    try {
      await prisma.pokemonTeam.update({
        where: { id: validated.data.id },
        data: {
          name: validated.data.name,
          pokemon: validated.data.pokemon,
          description: validated.data.description,
        },
      });
    } catch (error) {
      return Response.json(
        "There was an error updating the database: " + error,
      );
    }
  }

  //Redirect user
  return Response.json("Updated Success!");
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json("401: Unauthorised");

  const data = await request.json();

  //check the posts author id and validate this session matches
  const team = await prisma.pokemonTeam.findUnique({
    where: { id: data.id },
  });

  if (!team) return Response.json("404: Team not found");

  if (team.authorId === session.user.id) {
    try {
      await prisma.pokemonTeam.delete({ where: { id: data.id } });
    } catch (error) {
      return Response.json(
        "There was an error updating the database: " + error,
      );
    }
  }
  return Response.json("Deleted Successfully!");
}

const IPokeTeamZ = z.object({
  name: z.string(),
  pokemon: z.array(z.string().catch("")),
  description: z.string(),
  id: z.string().catch(""),
});
