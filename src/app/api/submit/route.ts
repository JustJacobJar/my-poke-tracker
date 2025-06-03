import { z } from "zod/v4";
import { IPokeTeam } from "@/lib/types";
import { auth } from "@/lib/auth";
import { prisma } from "@/app/prisma";

export async function POST(request: Request) {
  //Auth the user
  const session = await auth();
  if (!session?.user?.id) return Response.json("Error getting user data");

  //Capture and validate data
  const data = (await request.json()) as IPokeTeam;
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

  return Response.json("Success");
}

const IPokeTeamZ = z.object({
  name: z.string(),
  pokemon: z.array(z.string().catch("")),
  description: z.string(),
});
