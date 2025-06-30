import { prisma } from "../src/prisma";
import pokeFile from "../src/data/PokemonList.json";

async function main() {
  //get the user I want to save them under
  const user = await prisma.user.findUnique({
    where: { id: "cmch22njo0006ho3kllx80ed6" },
  });

  if (!user) return;

  //gen array of teams
  const teams = () => {
    const teamArr = [];
    //Generate x amount of teams
    for (let index = 0; index < 50; index++) {
      const slotNums: number[] = [];
      //get 6 numbers
      for (let i = 0; i < 6; i++) {
        slotNums.push(Math.floor(Math.random() * pokeFile.length - 1));
      }
      //Get names for team slots
      const pokemon: string[] = slotNums.map((val) => {
        return pokeFile[val];
      });
      //Create team
      const team = {
        authorId: "cmch22njo0006ho3kllx80ed6",
        name: `Gen Team ${index}`,
        pokemon: pokemon,
        description: `This team was generated to seed the database. Generated index: ${index}`,
      };
      teamArr.push(team);
    }

    return teamArr;
  };

  //createmany, maps teams
  await prisma.pokemonTeam.createMany({
    data: teams(),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
