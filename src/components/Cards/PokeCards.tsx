"use server";
import Image from "next/image";

export async function PokeCard({ name }: { name: string }) {
  //fetch data from api here
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex aspect-[3/4] w-64 flex-col place-content-around place-items-center gap-2 rounded-xl bg-neutral-500 p-4">
      <Image
        src={""}
        alt="Pokemon"
        className="aspect-square h-fit w-full bg-red-400"
      />
      <div className="flex w-full place-content-evenly">
        <label>Type 1</label>
        <label>Type 2</label>
      </div>
      <label>{name}</label>
    </div>
  );
}
