"use client";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_.5fr_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-12 text-center sm:items-start">
        <h2 className="place-self-center text-center text-5xl">Welcome to</h2>
        <h1 className="place-self-center text-center text-6xl font-black">
          My <span className="text-primary">Poke Team</span> Creator
        </h1>
        <div className="size-64 place-self-center">
          <Logo />
        </div>
      </main>
      <div className="row-start-3 flex flex-col flex-wrap place-items-center gap-4">
        <h2 className="text-2xl">Get started now</h2>
        <svg
          className="stroke-foreground bg-secondary animate-bounce rounded-full p-1 shadow-2xs"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
        <div className="flex flex-row justify-center gap-8">
          <Link
            className="bg-primary text-primary-foreground rounded-md p-2 px-4 text-xl font-bold transition-all duration-150 hover:inset-ring-1 hover:brightness-75 disabled:brightness-50"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        </div>
      </div>
      <footer className="row-start-4 flex flex-col flex-wrap items-center justify-center gap-4">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/JustJacobJar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="fill-foreground"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 640 640"
          >
            <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z" />
          </svg>
          Jacob A-R
        </a>
        <p>© 2025 - All Rights Reserved</p>
      </footer>
    </div>
  );
}
