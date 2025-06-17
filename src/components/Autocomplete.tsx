// import { cn } from "@/lib/utils";
"use client";
import { clsx, type ClassValue } from "clsx";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import pokeFile from "../app/data/PokemonList.json";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
when input is submitted, set search as complete -> hides restults
Upon input change show results
 */

export default function Autocomplete({
  // pokeList,
  classname,
  submitSearch,
  clearOnChange,
  slotName,
  editValue,
}: {
  // pokeList: string[];
  classname?: string;
  submitSearch?: (value: string) => void;
  clearOnChange?: any;
  slotName: string;
  editValue?: string;
}) {
  const pokeList: string[] = pokeFile;
  const [searchTerm, setSearchTerm] = useState(editValue ? editValue : "");
  const [activeIndex, setActiveIndex] = useState(-1);
  const { pokemon } = UsePokemon(pokeList as string[], searchTerm); //Filtered list of pokemon
  const [selected, setSelected] = useState(editValue ? true : false);

  //Reset search when page sends new data
  useEffect(() => {
    if (clearOnChange != undefined) {
      setSearchTerm("");
    }
  }, [clearOnChange]);

  //Handles search input filtering
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSelected(false);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!pokeList.includes(event.currentTarget.value)) {
      setSearchTerm("");
      return;
    }
    setSearchTerm(event.currentTarget.value);
    setSelected(true);
  };

  //Currently Selected option
  const handleSelect = (poke: string) => {
    console.log("Mouse gaming");

    setSearchTerm(poke);
    handleSearchSubmit(poke);
  };

  const handleMouseOver = (index: number) => {
    setActiveIndex(index);
  };

  //Calls a function higher up passing in the search
  const handleSearchSubmit = (guess: string) => {
    if (submitSearch) {
      submitSearch(guess); //should set the upper value to string selected
    }
    setSelected(true);
  };

  //Reset index upon list change or search term change
  useEffect(() => {
    setActiveIndex(0);
  }, [pokemon, searchTerm]);

  //Setup keys to navigate and select from the list
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % pokemon.length);
    }
    if (event.key === "ArrowUp") {
      setActiveIndex((prev) => (prev - 1 + pokemon.length) % pokemon.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        if (pokemon[activeIndex] != undefined) {
          setSearchTerm(pokemon[activeIndex]);
          handleSearchSubmit(pokemon[activeIndex]);
        }
      } catch {
        console.log("Guess doesnt exist");
      }
    }
  };

  const resultsDisplay = () => {
    if (!searchTerm) return <></>;
    if (selected) return <></>;

    return (
      <div className="border-league-gold scrollbar-thin scrollbar-track-foreground/10 scrollbar-thumb-primary scrollbar-track-rounded-2xl scrollbar-thumb-rounded-sm bg-card/95 absolute inset-y-12 z-10 flex h-[18vh] w-full -scroll-my-2 scroll-py-2 overflow-y-scroll rounded-lg border-2 p-2">
        <ResultList
          results={pokemon}
          searchTerm={searchTerm}
          handleSelect={handleSelect}
          handleMouseOver={handleMouseOver}
          activeIndex={activeIndex}
        />
      </div>
    );
  };

  return (
    <div className={cn(classname, "relative")}>
      <input
        id="autocomplete"
        name={slotName}
        className="bg-card text-foreground flex h-fit w-full shrink-0 rounded-lg py-2 text-center text-xl"
        onChange={handleChange}
        onKeyDown={onKeyDown}
        value={searchTerm}
        onBlur={handleBlur}
        placeholder="Type pokemon name..."
      />
      {resultsDisplay()}
    </div>
  );
}

export interface ResultListProps {
  results: string[];
  searchTerm: string;
  handleSelect: (pokeName: string) => void;
  handleMouseOver: (index: number) => void;
  activeIndex: number;
}

//Filtered results list
function ResultList({
  results,
  searchTerm,
  handleSelect,
  handleMouseOver,
  activeIndex,
}: ResultListProps) {
  const myRef = useRef<null | HTMLLIElement>(null);
  //The list of filtered terms
  const matchedTerm = (name: string, searchTerm: string) => {
    const index = name.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) {
      return name;
    }
    return (
      <>
        {name.substring(0, index)}
        <b>{name.substring(index, index + searchTerm.length)}</b>
        {name.substring(index + searchTerm.length)}
      </>
    );
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  //Scrolls active index into view upon index change
  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeIndex]);

  if (results.length === 0) {
    return <div className="w-full text-center text-xl">No results found</div>;
  }

  return (
    <>
      <ol className="flex h-fit w-full flex-col gap-1.5 p-1">
        {results.map((result, index) => (
          <li
            ref={activeIndex === index ? myRef : null}
            key={index}
            onMouseDown={() => handleSelect(result)}
            onMouseOver={() => handleMouseOver(index)}
            className={cn(
              "flex h-fit w-full flex-row place-content-start gap-2 text-center hover:bg-white/20",
              activeIndex === index
                ? "active ring-league-gold bg-white/20 ring-2 drop-shadow-md"
                : "",
            )}
          >
            {/* Image Square */}
            {/* <div className="flex w-fit aspect-square">
              <img className="size-full" src={`/app/tiles/${result.tile}`} />
            </div> */}
            {/* Name Area */}
            <div className="w-full place-self-center text-2xl">
              {matchedTerm(result, searchTerm)}{" "}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

//Filters the list for the given search term
function UsePokemon(pokeList: string[], searchTerm?: string) {
  const [pokemon, setpokemon] = useState<string[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      return setpokemon([]);
    }
    const filtedList = pokeList.filter((value) => {
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return setpokemon(filtedList);
  }, [pokeList, searchTerm]);
  return { pokemon };
}
