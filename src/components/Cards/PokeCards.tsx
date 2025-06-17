"use server";
export async function PokeCard({ name }: { name: string }) {
  //Provide it with the image, types, name

  //Check cache for the character.

  

  return (
    <div className="flex aspect-[3/4] min-w-fit flex-col place-content-around place-items-center gap-2 rounded-xl bg-neutral-500 p-4">
      <img alt="Pokemon" className="aspect-square h-fit w-full bg-red-400" />
      <div className="flex w-full place-content-evenly">
        <label>Type 1</label>
        <label>Type 2</label>
      </div>
      <label>{name}</label>
    </div>
  );
}
